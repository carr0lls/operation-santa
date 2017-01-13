import React from 'react';
import { LoginForm } from '../../components';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {user: {}};

		this.handleLogin = this.handleLogin.bind(this);
		this.updateForm = this.updateForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	handleLogin(user) {
		this.props.onAuth(user);
	}
	updateForm(e) {
		const newState = this.state.user;
		newState[e.target.name] = e.target.value;
		this.setState({user: newState});
	}
	submitForm(e) {
		e.preventDefault();

		this.handleLogin(this.state.user);
	}

	render() {
		return (
			<div className="row p-1">
				<LoginForm onSubmitForm={this.submitForm} onUpdateForm={this.updateForm} />
			</div>
		);
	}
};
