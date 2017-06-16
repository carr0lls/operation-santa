import React from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import { UserStory } from '../../components';
import { fetchUserProfile } from '../../actions';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			modal: { step: 1 }
		}
		this.api = { 
			url: 'https://api-operation-santa.herokuapp.com/api/'
		};
		this.delivery = {};

		this.fetchUserData = this.fetchUserData.bind(this);
		this.handleDonate = this.handleDonate.bind(this);
		this.resetModal = this.resetModal.bind(this);
	}
	fetchUserData(userId) {
		request
        	.get(this.api.url + 'user/' + userId)
			.end((err, result) => {
        		if (err) {
            		// user does not exist, move back to home page
					this.props.router.push('/');
            	}
            	else {
            		this.setState({ user: result.body });
            	}
        	});
	}
	handleDonate(e) {
		e.preventDefault();

		if (this.state.modal.step === 1) {
			$('.modal-footer button div').addClass('progress');

			let pickup_address = this.refs.pick_up_address.value.trim();
			let pickup_name = this.refs.pick_up_name.value.trim();
			let pickup_phone_number = this.refs.pick_up_phone.value.trim();
			let manifest = this.refs.pick_up_notes.value.trim();
			let dropoff_address = this.state.user.address;
			let dropoff_name = this.state.user.first_name;
			let dropoff_phone_number = this.state.user.phone_number;

			this.delivery.info = { 
				pickup_address, 
				pickup_name, 
				pickup_phone_number, 
				manifest,
				dropoff_address, 
				dropoff_name, 
				dropoff_phone_number 
			};

			let data = { 
				pickup_address, 
				dropoff_address 
			};

			request
	        	.post(this.api.url + 'postmates/get_estimate')
	        	.send(data)
				.end((err, result) => {
	        		if (err) {
	            		$('.modal-footer button div').removeClass('progress');
						alert(err.responseJSON.message);
	            	}
	            	else {
	            		// Move modal to page 2
						$('.modal-footer button div').removeClass('progress');
						let fee = result.body.fee.toString();
						result.body.fee = fee.substring(0, fee.length-2) + "." + fee.substring(fee.length-2, fee.length);
						let dropoff_eta = new Date(result.body.dropoff_eta);
						result.body.dropoff_eta = dropoff_eta.toLocaleString();
						this.delivery.estimate = result.body;
						this.setState({ modal: { step: 2 } });
	            	}
	        	});
		}
		else if (this.state.modal.step === 2) {
			$('.modal-footer button div').addClass('progress');

			let data = this.delivery.info;
			data.quote_id = this.delivery.estimate.id;

			request
	        	.post(this.api.url + 'postmates/create_delivery')
	        	.send(data)
				.end((err, result) => {
	        		if (err) {
	            		$('.modal-footer button div').removeClass('progress');
						alert(err.responseJSON.message);
	            	}
	            	else {
	            		$('.modal-footer button div').removeClass('progress');
						// Move modal to page 2
						this.delivery.status = res.body.status;
						this.setState({ modal: { step: 3 } });
	            	}
	        	});
		}
		else {
			$('#donationModal').modal('hide');
			this.setState({ modal: { step: 1 } });
		}
	}
	resetModal(e) {
		this.setState({ modal: { step: 1 } });
	}

	componentDidMount() {
		this.props.dispatch(fetchUserProfile(this.props.match.params.username));
	}

	componentWillReceiveProps(nextProps, nextState) {
		// Re-fetch profile data if click on navbar's react-router path to same page with new params
		if (nextProps.router.location.pathname !== this.props.router.location.pathname) {
			this.props.dispatch(fetchUserProfile(nextProps.match.params.username));
		}
	}

	render() {
		let modal_body;
		let profile = this.props.profile;
		let header = (profile.account_type == 'family') ? profile.first_name + '\'s family' : profile.first_name;

		switch (this.state.modal.step) {
			case 1:
				modal_body = (
					<div className="modal-body-footer">
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="pick-up-name" className="form-control-label">Name</label>
								<input type="text" className="form-control" ref="pick_up_name" name="pick_up_name" placeholder="Enter your name" required />
							</div>
							<div className="form-group">
								<label htmlFor="pick-up-address" className="form-control-label">Pick&#45;up address</label>
								<input type="text" className="form-control" ref="pick_up_address" name="pick_up_address" placeholder="Enter address to pick up your donations" required />
							</div>
							<div className="form-group">
								<label htmlFor="pick-up-phone" className="form-control-label">Phone</label>
								<input type="tel" className="form-control" ref="pick_up_phone" name="pick_up_phone" placeholder="(888)888-8888"/>
							</div>
							<div className="form-group">
								<label htmlFor="pick-up-notes" className="form-control-label">Notes</label>
								<textarea className="form-control" ref="pick_up_notes" name="pick_up_notes" maxLength="200" rows="3" placeholder="Enter any instructions for delivery person" required ></textarea>
							</div>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-block btn-danger"><div>Get delivery quote via Postmates</div></button>
						</div>						
					</div>
				);
				break;

			case 2:
				modal_body = (
					<div className="modal-body-footer">
						<div className="modal-body">
							<p><strong>Estimated drop&#45;off time:</strong> { this.delivery.estimate.dropoff_eta }</p>
							<p><strong>Duration:</strong> { this.delivery.estimate.duration } minutes</p>
							<p><strong>Delivery fee:</strong> ${ this.delivery.estimate.fee }</p>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-block btn-lg btn-success"><div>Request delivery</div></button>
						</div>
					</div>
				);
				break;

			case 3:
				modal_body = (
					<div className="modal-body-footer">
						<div className="modal-body">
							<div className="alert alert-success" role="alert">
								<strong>Success!</strong> Delivery status: { this.delivery.status.toUpperCase() }
							</div>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-block btn-secondary">Close</button>
						</div>
					</div>
				);
				break;

			default:
				break;
		} 		

		return (
    		<div className="profile row p-1">
				<UserStory user={profile}>{ header }</UserStory>
				<div>
					<h1>Wishlist</h1>
					<ul>
						<li>iPod</li>
						<li>Barbie</li>
						<li>Legos</li>
					</ul>
				</div>
				<div className="donation-modal">
					<button type="button" className="btn btn-success btn-lg" data-toggle="modal" data-target="#donationModal">Donate</button>
					<div className="modal fade" id="donationModal" tabIndex="-1" role="dialog" aria-labelledby="donationModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<form onSubmit={this.handleDonate}>
									<div className="modal-header">
										<button type="button" className="close" onClick={this.resetModal} data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
										<h4 className="modal-title" id="donationModalLabel">Donate to { profile.first_name + '\'s family' }</h4>
									</div>							
									{ modal_body }
								</form>									
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps({ profile, router }) {
	return {
		profile,
		router
	}
}

export default connect(mapStateToProps)(Profile);