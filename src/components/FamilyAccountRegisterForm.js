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
		let account_type = this.refs.account_type.value.trim()
		let family_size = this.refs.family_size.value.trim()
		let family_story = this.refs.family_story.value.trim()
		let family_photo = this.refs.family_photo.value.trim()
		let formData = { first_name, last_name, username, password, account_type, family_size, family_story, family_photo }

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
				    	<label htmlFor="family_size">Family size</label>
				    	<select className="form-control" ref="family_size" name="family_size">
				    		<option value="1">1</option>
				    		<option value="2">2</option>
				    		<option value="3">3</option>
				    		<option value="4">4</option>
				    		<option value="5">5</option>
				    		<option value="6">6</option>				    		
						</select>
					</div>					  
					<div className="form-group">
						<label htmlFor="family_story">Story</label>
						<textarea className="form-control" ref="family_story" name="family_story" rows="3" placeholder="Tell us a little about your family." required></textarea>
					</div>
					<div className="form-group">
				    <label htmlFor="family_photo">Upload Photo</label>
						<input type="file" className="form-control-file" ref="family_photo" name="family_photo" aria-describedby="fileHelp" required/>
						<small id="fileHelp" className="form-text text-muted">Please upload a photo of whom would be receiving the gift.</small>
					</div>
					<input type="hidden" ref="account_type" name="account_type" value="family" />
					<button type="submit" className="btn btn-danger">Submit</button>
				</form>
			</div>
		)
	}
}