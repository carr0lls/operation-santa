import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FamilyAccountRegisterForm, DonorAccountRegisterForm } from '../../components';
import { toggleRegistrationForm, updateRegistrationForm, registerNewUser } from '../../actions';

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.handleRegistration = this.handleRegistration.bind(this);
		this.toggleFormOne = this.toggleFormOne.bind(this);
		this.toggleFormTwo = this.toggleFormTwo.bind(this);
		this.updateForm = this.updateForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	handleRegistration(userData) {
		this.props.dispatch(registerNewUser(userData));
	}
	toggleFormOne() {
		this.props.dispatch(toggleRegistrationForm(1));
	}
	toggleFormTwo() {
		this.props.dispatch(toggleRegistrationForm(2));
	}
	updateForm(e) {
		const newFormState = this.props.register.form;

		if (e.target.name === 'family_photo') {
			const reader = new FileReader();
	   		reader.onload = (evt) => {
	   			newFormState[this.props.register.active]['family_photo'] = evt.target.result.substr(evt.target.result.indexOf(",") + 1, evt.target.result.length);
				this.props.dispatch(updateRegistrationForm(newFormState));
	   		}
	   		reader.readAsDataURL(e.target.files[0]);
		}
		else {
			newFormState[this.props.register.active][e.target.name] = e.target.value;
			this.props.dispatch(updateRegistrationForm(newFormState));
		}
	}
	submitForm(e) {
		e.preventDefault();
		const data = this.props.register.form[this.props.register.active];

		this.handleRegistration(data);
	}

	render() {
		const toggleOneClasses = classnames('btn btn-secondary', {'active': this.props.register.active === 1});
		const toggleTwoClasses = classnames('btn btn-secondary', {'active': this.props.register.active === 2});
		const formOneClasses = classnames({'hidden-xl-down': this.props.register.active !== 1});
		const formTwoClasses = classnames({'hidden-xl-down': this.props.register.active !== 2});
		const registerButtonClasses = classnames({'progress': this.props.register.isRegistering});
		
		return (
			<div className="register row p-1">
				<div className="register-btn-group mb-2 mx-auto">
					<div className="btn-group" role="group">
					  <button type="button" className={toggleOneClasses} onClick={this.toggleFormOne}>
					  	Adopt Family
					  </button>
					  <button type="button" className={toggleTwoClasses} onClick={this.toggleFormTwo}>
					  	Nominate Family
					  </button>
					</div>
				</div>
				<DonorAccountRegisterForm className={formOneClasses} onSubmitForm={this.submitForm} onUpdateForm={this.updateForm} registerButtonClasses={registerButtonClasses} />					
				<FamilyAccountRegisterForm className={formTwoClasses} onSubmitForm={this.submitForm} onUpdateForm={this.updateForm} registerButtonClasses={registerButtonClasses} />
			</div>
		);
	}
};

function mapStateToProps({ register }) {
	return {
		register
	}
}

export default connect(mapStateToProps)(Register);