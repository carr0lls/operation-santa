import React from 'react'

	export default class UserStory extends React.Component {
		render() {
			return (
				<div className="user-story">
					<h3 className="header-title">{ this.props.children }</h3>
	    			<article className="mb-1">
	    				<img className="photo" src={ this.props.user.family_photo } alt="family_photo" />
	    			</article>
	    			<section>
						<p>{ this.props.user.family_story }</p>
					</section>
				</div>
			)
		}
	}