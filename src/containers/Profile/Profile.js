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
				user: context.data.users[this.props.params.username] || {}
			}
			this.api = {
				url: context.data.api.url
			}

			this.fetchUserData = this.fetchUserData.bind(this)
			this.handleDonate = this.handleDonate.bind(this)
		}
		fetchUserData() {
			fetch(this.api.url + 'user/' + this.props.params.username)
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

			let pick_up = this.refs.pick_up_address.value.trim()
			let drop_off = this.state.user.address
			let pick_up_name = this.refs.pick_up_name.value.trim()
			let pick_up_time = this.refs.pick_up_time.value.trim()
			let pick_up_phone = this.refs.pick_up_phone.value.trim()
			let pick_up_notes = this.refs.pick_up_notes.value.trim()

			let data = { pick_up, drop_off }
			console.log('get estimate:', data)
			$.ajax({
				url: this.api.url + 'postmates/get_estimate',
				type: 'POST',
				data
			}).done((res) => {
				console.log('Estimate:', res)
				alert('Estimate delivery quote: ' + res.fee)
			})
/*			fetch(this.api.url + 'postmates/get_estimate', {
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
					console.log('Estimate:', json)
				})
				.catch((ex) => {
					console.log('Failed to get estimate')
				})*/
		}

		componentDidMount() {
			this.fetchUserData()
		}

		render() {
			let user = {}

			if (this.state.user)
				user = this.state.user

			let header = user.account_type == 'family' ? user.first_name + '\'s family' : user.first_name			

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
													<label htmlFor="recipient-name" className="form-control-label">Pick&#45;up time</label>
													<input type="datetime-local" className="form-control" ref="pick_up_time" name="pick_up_time" />
												</div>
												<div className="form-group">
													<label htmlFor="recipient-name" className="form-control-label">Phone</label>
													<input type="tel" className="form-control" ref="pick_up_phone" name="pick_up_phone" pattern="[\(]\d{3}[\)]\d{3}[\-]\d{4}" placeholder="(415)888-8888"/>
												</div>
												<div className="form-group">
													<label htmlFor="message-text" className="form-control-label">Notes</label>
													<textarea className="form-control" ref="pick_up_notes" name="pick_up_notes" maxLength="200" rows="3" placeholder="Enter any instructions for delivery person"></textarea>
												</div>
										</div>
										<div className="modal-footer">
											<button type="submit" className="btn btn-block btn-danger">Get Quote</button>
										</div>
									</form>									
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
