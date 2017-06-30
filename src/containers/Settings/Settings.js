import React from 'react';
import { connect } from 'react-redux';
import { EditProfileForm } from '../../components';
import { updateUserSettings, updateUserSettingsForm } from '../../actions';

class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.handleUserUpdate = this.handleUserUpdate.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.updateForm = this.updateForm.bind(this);
	}
	handleUserUpdate(userData) {
		this.props.dispatch(updateUserSettings(this.props.user.id, userData));
	}
	submitForm(e) {
		e.preventDefault();
		
		this.handleUserUpdate(this.props.settings.form);
	}
	updateForm(e) {
		const newFormState = this.props.settings.form;
		newFormState[e.target.name] = e.target.value;
		
		this.props.dispatch(updateUserSettingsForm(newFormState));
	}
	
	render() {
		const editProfileForm = <EditProfileForm user={this.props.user} onSubmitForm={this.submitForm} onUpdateForm={this.updateForm} isUpdating={this.props.settings.isUpdating} />;

		return (
				<div className="settings row p-1">
					{ editProfileForm }
				</div>
			);
	}
};

function mapStateToProps({ settings, user }) {
	return { 
		settings,
		user 
	}
}

export default connect(mapStateToProps)(Settings);