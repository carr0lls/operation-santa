import React from 'react';
import classnames from 'classnames';

const LoginForm = ({ onSubmitForm, onUpdateForm, isLoggingIn }) => {
	const loginBtnProgressClasses = classnames({'progress': isLoggingIn});

	return (
		<div>
			<h4>Login</h4>
			<form onChange={onUpdateForm} onSubmit={onSubmitForm}>
				<div className="form-group">
			    	<label htmlFor="username">Email address</label>
			    	<input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" required />
				</div>
				<div className="form-group">
			    	<label htmlFor="password">Password</label>
			    	<input type="password" className="form-control" name="password" placeholder="Password" required />
				</div>
				<button type="submit" className="btn btn-danger btn-block btn-lg">
					<div className={loginBtnProgressClasses}>Login</div>
				</button>
			</form>
		</div>
	);

};

export default LoginForm;
