import React from 'react';
import { connect } from 'react-redux';
import { EditProfileForm } from '../../components';

class EditProfile extends React.Component {
	constructor(props) {
		super(props);

		this.submitForm = this.submitForm.bind(this);
		this.updateForm = this.updateForm.bind(this);
	}
	submitForm() {

	}
	updateForm() {

	}

	componentWillMount() {

	}

	componentDidMount() {

	}
	
	render() {
		let form;
		if (this.props.user.authComplete)
			form = <EditProfileForm user={this.props.user} onSubmitForm={this.submitForm} onUpdateForm={this.updateForm} />;

		return (
				<div>
					{ form }
				</div>
			);
	}
};

function mapStateToProps({ user }) {
	return { user };
}

export default connect(mapStateToProps)(EditProfile);