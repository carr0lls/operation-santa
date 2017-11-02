import React from 'react';
import classnames from 'classnames';

const EditProfileForm = ({
	user,
	className,
	onSubmitForm,
	onUpdateForm,
	isUpdating,
}) => {
	const updatingBtnProgressClasses = classnames({'progress': isUpdating});

	return (
		<div className={className}>
			<h2>Edit {user.first_name}&#39;s Profile</h2>
			<form onSubmit={onSubmitForm} onChange={onUpdateForm}>
				<div className="form-group">
			    	<label htmlFor="first_name">First Name</label>
			    	<input type="text" className="form-control" name="first_name" placeholder="Enter first name"/>
				</div>
				<div className="form-group">
			    	<label htmlFor="last_name">Last Name</label>
			    	<input type="text" className="form-control" name="last_name" placeholder="Enter last name"/>
				</div>
				<div className="form-group">
			    	<label htmlFor="email">Email address</label>
			    	<input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
				</div>
				<div className="form-group">
			    	<label htmlFor="username">Username</label>
			    	<input type="text" className="form-control" name="username" placeholder="Enter username"/>
				</div>
				<div className="form-group">
			    	<label htmlFor="password">Password</label>
			    	<input type="password" className="form-control" name="password" placeholder="Password"/>
				</div>
				<div className="form-group">
					<label htmlFor="phone-number" className="form-control-label">Phone Number</label>
					<input type="tel" className="form-control" name="phone_number" placeholder="(888)888-8888"/>
				</div>
				<div className="form-group">
					<label htmlFor="wishlist-item-1" className="form-control-label">Wishlist Item 1:</label>
					<input type="text" className="form-control" name="wishlist-item-1" placeholder="Enter wishlist item"/>
				</div>
				<div className="form-group">
					<label htmlFor="wishlist-item-1" className="form-control-label">Wishlist Item 2:</label>
					<input type="text" className="form-control" name="wishlist-item-2" placeholder="Enter wishlist item"/>
				</div>
				<div className="form-group">
					<label htmlFor="wishlist-item-1" className="form-control-label">Wishlist Item 3:</label>
					<input type="text" className="form-control" name="wishlist-item-3" placeholder="Enter wishlist item"/>
				</div>
				<button type="submit" className="btn btn-danger btn-block btn-lg">
					<div className={updatingBtnProgressClasses}>Update</div>
				</button>
			</form>
		</div>
	);
};

export default EditProfileForm;
