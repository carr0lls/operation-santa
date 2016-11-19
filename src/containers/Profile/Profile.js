import React from 'react'
import 'whatwg-fetch'
import { UserStory } from '../../components'

	export default class Profile extends React.Component {
		static get contextTypes() {
		    return {
		        data: React.PropTypes.object
		    }
		}
		constructor(props, context) {
			super(props, context)
			this.state = {
				user: context.data.users[this.props.params.username] || {},
				modal: { step: 1 }
			}
			this.api = { url: context.data.api.url }
			this.delivery = {}

			this.fetchUserData = this.fetchUserData.bind(this)
			this.handleDonate = this.handleDonate.bind(this)
		}
		fetchUserData(userId) {
			fetch(this.api.url + 'user/' + userId)
				.then((response) => {
					return response.json()
				})
				.then((json) => {
					this.setState({ user: json })
				})
				.catch((ex) => {
					// user does not exist, move back to home page
					this.props.router.push('/')
				})
		}
		handleDonate(e) {
			e.preventDefault()

			if (this.state.modal.step === 1) {
				let pickup_address = this.refs.pick_up_address.value.trim()
				let pickup_name = this.refs.pick_up_name.value.trim()
				let pickup_phone_number = this.refs.pick_up_phone.value.trim()
				let manifest = this.refs.pick_up_notes.value.trim()	
				let dropoff_address = this.state.user.address
				let dropoff_name = this.state.user.first_name
				let dropoff_phone_number = this.state.user.phone_number || '123-456-7890'

				this.delivery.info = { 
					pickup_address, 
					pickup_name, 
					pickup_phone_number, 
					manifest,
					dropoff_address, 
					dropoff_name, 
					dropoff_phone_number 
				}

				let data = { 
					pickup_address, 
					dropoff_address 
				}

				$.ajax({
					url: this.api.url + 'postmates/get_estimate',
					type: 'POST',
					data
				}).done((res) => {
					// Move modal to page 2
					this.delivery.estimate = res
					this.setState({ modal: { step: 2 } })
				})
/*				fetch(this.api.url + 'postmates/get_estimate', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					body: data
				})
					.then((response) => { 
						return response.json()
					})
					.then((json) => {
						// Move modal to page 2
						this.delivery.estimate = json
						this.setState({ modal: { step: 2, data: res } })						
					})
					.catch((ex) => {
						console.log('Failed to get estimate')
					})*/
			}
			else {
				console.log(this.delivery.info)
				let data = this.delivery.info
				data.quote_id = this.delivery.estimate.id
				console.log(data)
				$.ajax({
					url: this.api.url + 'postmates/create_delivery',
					type: 'POST',
					data
				}).done((res) => {
					alert('Delivery confirmed!')
					console.log('Delivery:', res)
				})
			}
		}

		componentDidMount() {
			this.fetchUserData(this.props.params.username)
		}

		componentWillReceiveProps(nextProps) {
			// Re-fetch user data if click on navbar's react-router path to same page with new params
			this.fetchUserData(nextProps.params.username)
		}

		render() {
			let user = {}

			if (this.state.user)
				user = this.state.user

			let header = (user.account_type == 'family') ? user.first_name + '\'s family' : user.first_name			

			let modal_body = (this.state.modal.step === 1) ? 
					<div className="modal-body-footer">
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="recipient-name" className="form-control-label">Name</label>
								<input type="text" className="form-control" ref="pick_up_name" name="pick_up_name" placeholder="Enter your name" required />
							</div>
							<div className="form-group">
								<label htmlFor="recipient-name" className="form-control-label">Pick&#45;up address</label>
								<input type="text" className="form-control" ref="pick_up_address" name="pick_up_address" placeholder="Enter address to pick up your donations" required />
							</div>
							<div className="form-group">
								<label htmlFor="recipient-name" className="form-control-label">Phone</label>
								<input type="tel" className="form-control" ref="pick_up_phone" name="pick_up_phone" placeholder="(415)888-8888"/>
							</div>
							<div className="form-group">
								<label htmlFor="message-text" className="form-control-label">Notes</label>
								<textarea className="form-control" ref="pick_up_notes" name="pick_up_notes" maxLength="200" rows="3" placeholder="Enter any instructions for delivery person"></textarea>
							</div>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-block btn-danger">Get Pick&#45;up Delivery Quote via Postmates</button>
						</div>						
					</div>
					: 
					<div className="modal-body-footer">
						<div className="modal-body">
							<p>Drop&#45;off time: { this.delivery.estimate.dropoff_eta }</p>
							<p>Estimated time: { this.delivery.estimate.duration }</p>
							<p>Shipping fee: { this.delivery.estimate.fee }</p>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-block btn-success">Request Pick&#45;up Delivery</button>
						</div>
					</div>

			return (
        		<div className="profile row p-1">
					<UserStory user={user}>{ header }</UserStory>
					<div className="donation-modal" onSubmit={this.handleDonate}>
						<button type="button" className="btn btn-success btn-lg" data-toggle="modal" data-target="#donationModal">Donate</button>
						<div className="modal fade" id="donationModal" tabIndex="-1" role="dialog" aria-labelledby="donationModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<form>
										<div className="modal-header">
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
											<h4 className="modal-title" id="donationModalLabel">Donate to { user.first_name + '\'s family' }</h4>
										</div>									
										{ modal_body }
									</form>									
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
