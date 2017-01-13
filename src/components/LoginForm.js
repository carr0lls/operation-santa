import React from 'react';

const LoginForm = ({onSubmitForm, onUpdateForm}) => {

	return (
		<div>
			<h4>Login</h4>
			<form onChange={onUpdateForm} onSubmit={onSubmitForm}>
				<div className="form-group">
			    	<label htmlFor="username">Email address</label>
			    	<input type="email" className="form-control" name="username" aria-describedby="emailHelp" placeholder="Enter email" required />
				</div>
				<div className="form-group">
			    	<label htmlFor="password">Password</label>
			    	<input type="password" className="form-control" name="password" placeholder="Password" required />
				</div>
				<button type="submit" className="btn btn-danger">Submit</button>
			</form>
		</div>
	);

};

export default LoginForm;