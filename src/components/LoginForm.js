import React from 'react';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		let username = this.refs.username.value.trim();
		let password = this.refs.password.value.trim();
		let formData = { username, password };

		this.props.onSubmitForm(formData);
	}

	render() {
		return (
			<div onSubmit={this.handleSubmit}>
				<h4>Login</h4>
				<form>
					<div className="form-group">
				    	<label htmlFor="username">Email address</label>
				    	<input type="email" className="form-control" ref="username" name="username" aria-describedby="emailHelp" placeholder="Enter email" required />
					</div>
					<div className="form-group">
				    	<label htmlFor="password">Password</label>
				    	<input type="password" className="form-control" ref="password" name="password" placeholder="Password" required />
					</div>
					<button type="submit" className="btn btn-danger">Submit</button>
				</form>
			</div>
		);
	}
};