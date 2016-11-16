import React from 'react'

	export default class UserStory extends React.Component {
		render() {
			let family_photo = (this.props.user.family_photo) ? 'data:image/png;base64,' + this.props.user.family_photo : ''

			return (
				<div>
					<h3 className="header-title">{ this.props.children }</h3>
	    			<article className="mb-1">
	    				<img className="photo" src={ family_photo } alt="family_photo" height="300" />
	    			</article>
	    			<section>
						<p>{ this.props.user.family_story }</p>
					</section>
				</div>
			)
		}
	}