import React from 'react';

const UserStory = ({children, user}) => {
	
	return (
		<div className="user-story">
			<h3 className="header-title">{ children }</h3>
			<article className="mb-1">
				<img className="photo" src={ user.family_photo } alt="family_photo" />
			</article>
			<section>
				<p>{ user.family_story }</p>
			</section>
		</div>
	);
	
};

export default UserStory;