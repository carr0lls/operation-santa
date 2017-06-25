import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { UserStory } from '../../components';
import { 
	fetchUserProfile, 
	updateDeliveryModalForm,
	setModalStep, 
	getEstimateFromPostmates, 
	createPostmatesDelivery 
} from '../../actions';

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.handleDonate = this.handleDonate.bind(this);
		this.updateModalForm = this.updateModalForm.bind(this);
		this.setModal = this.setModal.bind(this);
		this.resetModal = this.resetModal.bind(this);
		this.getDeliveryEstimate = this.getDeliveryEstimate.bind(this);
		this.createDelivery = this.createDelivery.bind(this);
	}
	handleDonate(e) {
		e.preventDefault();

		if (this.props.profile.modal.step === 1) {
			const { pickup_address } = this.props.profile.modal.form;
			const { address } = this.props.profile.user;

			const  data = { 
				pickup_address, 
				dropoff_address: address
			};

			this.getDeliveryEstimate(data);
		}
		else if (this.props.profile.modal.step === 2) {
			const { pickup_address, pickup_name, pickup_phone_number, manifest } = this.props.profile.modal.form;
			const { address, first_name, phone_number } = this.props.profile.user;
			const { estimate } = this.props.profile.delivery;
			
			const data = { 
				pickup_address, 
				pickup_name, 
				pickup_phone_number, 
				manifest,
				dropoff_address: address,
				dropoff_name: first_name,
				dropoff_phone_number: phone_number,
				quote_id: estimate.id
			};

			this.createDelivery(data);
		}
		else {
			this.setModal(1);
		}
	}
	updateModalForm(e) {
		const newState = this.props.profile.modal.form;
		newState[e.target.name] = e.target.value;
		this.props.dispatch(updateDeliveryModalForm(newState));
	}
	setModal(step) {
		this.props.dispatch(setModalStep(step));
	}
	resetModal(e) {
		this.setModal(1);
	}
	getDeliveryEstimate(deliveryData) {
		this.props.dispatch(getEstimateFromPostmates(deliveryData));
	}
	createDelivery(deliveryData) {
		this.props.dispatch(createPostmatesDelivery(deliveryData));		
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
		const profile = this.props.profile;
		const getEstimateBtnProgressClass = classnames({'progress': this.props.profile.isFetchingDeliveryEstimate});
		const requestDeliveryBtnProgressClass = classnames({'progress': this.props.profile.isCreatingDelivery});		
		const header = (profile.user.account_type == 'family') 
						? profile.user.first_name + '\'s family' 
						: profile.user.first_name;

		switch (this.props.profile.modal.step) {
			case 1:
				modal_body = (
					<div className="modal-body-footer">
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="pick-up-name" className="form-control-label">Name</label>
								<input type="text" className="form-control" ref="pickup_name" name="pickup_name" placeholder="Enter your name" required />
							</div>
							<div className="form-group">
								<label htmlFor="pick-up-address" className="form-control-label">Pick&#45;up address</label>
								<input type="text" className="form-control" ref="pickup_address" name="pickup_address" placeholder="Enter address to pick up your donations" required />
							</div>
							<div className="form-group">
								<label htmlFor="pick-up-phone" className="form-control-label">Phone</label>
								<input type="tel" className="form-control" ref="pickup_phone_number" name="pickup_phone_number" placeholder="(888)888-8888"/>
							</div>
							<div className="form-group">
								<label htmlFor="pick-up-notes" className="form-control-label">Notes</label>
								<textarea className="form-control" ref="manifest" name="manifest" maxLength="200" rows="3" placeholder="Enter any instructions for delivery person" required ></textarea>
							</div>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-block btn-lg btn-danger">
								<div className={getEstimateBtnProgressClass}>Get delivery quote via Postmates</div>
							</button>
						</div>						
					</div>
				);
				break;

			case 2:
				modal_body = (
					<div className="modal-body-footer">
						<div className="modal-body">
							<p><strong>Estimated drop&#45;off time:</strong> { this.props.profile.delivery.estimate.dropoff_eta }</p>
							<p><strong>Duration:</strong> { this.props.profile.delivery.estimate.duration } minutes</p>
							<p><strong>Delivery fee:</strong> ${ this.props.profile.delivery.estimate.fee }</p>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-block btn-lg btn-success">
								<div className={requestDeliveryBtnProgressClass}>Request delivery</div>
							</button>
						</div>
					</div>
				);
				break;

			case 3:
				modal_body = (
					<div className="modal-body-footer">
						<div className="modal-body">
							<div className="alert alert-success" role="alert">
								<strong>Success!</strong> Delivery status: { this.props.profile.delivery.status.toUpperCase() }
							</div>
						</div>
						<div className="modal-footer">
							<button type="submit" className="btn btn-block btn-secondary" data-dismiss="modal">Close</button>
						</div>
					</div>
				);
				break;

			default:
				break;
		} 		

		return (
    		<div className="profile row p-1">
				<UserStory user={profile.user}>{ header }</UserStory>
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
								<form onSubmit={this.handleDonate} onChange={this.updateModalForm}>
									<div className="modal-header">
										<button type="button" className="close" onClick={this.resetModal} data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
										<h4 className="modal-title" id="donationModalLabel">Donate to { profile.user.first_name + '\'s family' }</h4>
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