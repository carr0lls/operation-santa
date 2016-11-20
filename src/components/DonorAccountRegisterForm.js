import React from 'react'

export default class DonorAccountRegisterForm extends React.Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(e) {
		e.preventDefault()
		let first_name = this.refs.first_name.value.trim()
		let last_name = this.refs.last_name.value.trim()
		let username = this.refs.username.value.trim()
		let password = this.refs.password.value.trim()
		let phone_number = this.refs.phone_number.value.trim()
		let account_type = this.refs.account_type.value.trim()

		let formData = { first_name, last_name, username, password, phone_number, account_type }
		console.log(formData)
	}

	render() {
		return (
			<div className={this.props.className} onSubmit={this.handleSubmit}>
				<h4>Donate Christmas gifts to families in need!</h4>
				<form>
					<div className="form-group">
				    	<label htmlFor="first_name">First Name</label>
				    	<input type="text" className="form-control" ref="first_name" name="first_name" placeholder="Enter first name" required />
					</div>
					<div className="form-group">
				    	<label htmlFor="last_name">Last Name</label>
				    	<input type="text" className="form-control" ref="last_name" name="last_name" placeholder="Enter last name" required />
					</div>
					<div className="form-group">
				    	<label htmlFor="username">Email address</label>
				    	<input type="email" className="form-control" ref="username" name="username" aria-describedby="emailHelp" placeholder="Enter email" required />
					</div>
					<div className="form-group">
				    	<label htmlFor="password">Password</label>
				    	<input type="password" className="form-control" ref="password" name="password" placeholder="Password" required />
					</div>
					<div className="form-group">
						<label htmlFor="phone-number" className="form-control-label">Phone Number</label>
						<input type="tel" className="form-control" ref="phone_number" name="phone_number" placeholder="(888)888-8888" required />
					</div>
					<input type="hidden" ref="account_type" name="account_type" value="donor" />
					<button type="submit" className="btn btn-danger">Submit</button>
				</form>
			</div>
		)
	}
}