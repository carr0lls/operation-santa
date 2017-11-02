import React from 'react';

const FamilyAccountRegisterForm = ({ 
	className,
	onSubmitForm,
	onUpdateForm,
	registerButtonClasses,
}) => (
	<div className={className}>
		<h4>Sign up your family for Christmas gifts!</h4>
		<form onSubmit={onSubmitForm} onChange={onUpdateForm}>
			<div className="form-group">
		    	<label htmlFor="first_name">First Name</label>
		    	<input type="text" className="form-control" name="first_name" placeholder="Enter first name" required />
			</div>
			<div className="form-group">
		    	<label htmlFor="last_name">Last Name</label>
		    	<input type="text" className="form-control" name="last_name" placeholder="Enter last name" required />
			</div>
			<div className="form-group">
		    	<label htmlFor="email">Email Address</label>
		    	<input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" required />
			</div>
			<div className="form-group">
				<label htmlFor="phone-number" className="form-control-label">Phone Number</label>
				<input type="tel" className="form-control" name="phone_number" placeholder="(888)888-8888" required />
			</div>
			<div className="form-group">
		    	<label htmlFor="address">Shipping Address</label>
		    	<input type="text" className="form-control" name="address" placeholder="Enter shipping address" required />
			</div>
			<div className="form-group">
		    	<label htmlFor="password">Password</label>
		    	<input type="password" className="form-control" name="password" placeholder="Password" required />
			</div>
			<div className="form-group">
		    	<label htmlFor="family_size">Family size</label>
		    	<select className="form-control" name="family_size" required>
		    		<option value="1">1</option>
		    		<option value="2">2</option>
		    		<option value="3">3</option>
		    		<option value="4">4</option>
		    		<option value="5">5</option>
		    		<option value="6">6</option>				    		
				</select>
			</div>					  
			<div className="form-group">
				<label htmlFor="family_story">Family Story</label>
				<textarea className="form-control" name="family_story" maxLength="700" rows="5" placeholder="Tell us a little about your family." required></textarea>
			</div>
			<div className="form-group">
		    <label htmlFor="family_photo">Family Photo</label>
				<input type="file" className="form-control-file" name="family_photo" aria-describedby="fileHelp" required/>
				<small id="fileHelp" className="form-text text-muted">Please upload a photo of your family/whom would be receiving the gifts.</small>
			</div>
			<button type="submit" className="btn btn-danger btn-block btn-lg">
				<div className={registerButtonClasses}>Sign Up</div>
			</button>
		</form>
	</div>
);

export default FamilyAccountRegisterForm;
