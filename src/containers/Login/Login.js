import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from '../../components';
import { login } from '../../actions';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {user: {}};

		this.handleLogin = this.handleLogin.bind(this);
		this.updateForm = this.updateForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	handleLogin(user) {
		// this.props.onLogin(user);
		this.props.dispatch(login(user));
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

function mapStateToProps({ user }) {
	return { user }
}

export default connect(mapStateToProps)(Login);
