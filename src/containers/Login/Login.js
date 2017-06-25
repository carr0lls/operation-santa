import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from '../../components';
import { login, updateLoginForm } from '../../actions';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.handleUserLogin = this.handleUserLogin.bind(this);
		this.updateForm = this.updateForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	handleUserLogin(user) {
		this.props.dispatch(login(user));
	}
	updateForm(e) {
		const newFormState = this.props.login.form;
		newFormState[e.target.name] = e.target.value;
		this.props.dispatch(updateLoginForm(newFormState));
	}
	submitForm(e) {
		e.preventDefault();

		this.handleUserLogin(this.props.login.form);
	}

	render() {
		return (
			<div className="row p-1">
				<LoginForm onSubmitForm={this.submitForm} onUpdateForm={this.updateForm} isLoggingIn={this.props.login.isLoggingIn} />
			</div>
		);
	}
};

function mapStateToProps({ login }) {
	return { 
		login
	}
}

export default connect(mapStateToProps)(Login);
