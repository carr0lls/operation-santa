import React from 'react'

export default class FamilyAccountRegisterForm extends React.Component {
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
		let type = this.refs.account_type.value.trim()
		let formData = { first_name, last_name, username, password, type }

		this.props.onSubmitForm(formData)
	}

	render() {
		return (
			<div className={this.props.className} onSubmit={this.handleSubmit}>
				<h4>Sign up your family for Christmas gifts!</h4>
				<form>
					<div className="form-group">
				    	<label htmlFor="first_name">First Name</label>
				    	<input type="text" className="form-control" ref="first_name" name="first_name" placeholder="Enter first name" required />
					</div>
					<div className="form-group">
				    	<label htmlFor="last_name">Last Name</label>
				    	<input type="text" className="form-control" name="last_name" placeholder="Enter last name" required />
					</div>
					<div className="form-group">
				    	<label htmlFor="username">Email address</label>
				    	<input type="email" className="form-control" name="username" aria-describedby="emailHelp" placeholder="Enter email" required />
					</div>
					<div className="form-group">
				    	<label htmlFor="password">Password</label>
				    	<input type="password" className="form-control" name="password" placeholder="Password" required />
					</div>
					<div className="form-group">
				    	<label htmlFor="family_size">Family size</label>
				    	<select className="form-control" name="family_size">
				    		<option value="1">1</option>
				    		<option value="2">2</option>
				    		<option value="3">3</option>
				    		<option value="4">4</option>
				    		<option value="5">5</option>
				    		<option value="6">6</option>				    		
						</select>
					</div>					  
					<div className="form-group">
						<label htmlFor="user_story">Story</label>
						<textarea className="form-control" name="user_story" rows="3" placeholder="Tell us a little about your family." required></textarea>
					</div>
					<div className="form-group">
				    <label htmlFor="user_photo">Upload Photo</label>
						<input type="file" className="form-control-file" name="user_photo" aria-describedby="fileHelp" required/>
						<small id="fileHelp" className="form-text text-muted">Please upload a photo of whom would be receiving the gift.</small>
					</div>
					<input type="hidden" name="account_type" value="family" />
					<button type="submit" className="btn btn-danger">Submit</button>
				</form>
			</div>
		)
	}
}