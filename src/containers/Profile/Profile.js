import React from 'react'

	export default class Profile extends React.Component {
		constructor(props) {
			super(props)

			// temp implementation until serverside can provide user profile without checking localstorage
			let user = {};			
			let browserStorage = (typeof localStorage === 'undefined') ? null : localStorage;
			if (browserStorage) {
				user = JSON.parse(localStorage.getItem('profile'))
			}			
			this.state = {
				user 
			}

			this.renderData = this.renderData.bind(this)
			this.submitForm = this.submitForm.bind(this)
		}

		renderData() {

		}

		submitForm() {
			
		}

		renderProfilePicture(imgStr) {
			return 'data:image/png;base64,' + imgStr
		}

		render() {
			let header = `Profile page`
			let profile_pic = `Profile picture`

			if (this.state.user) {
				header = this.state.user.account_type == 'family' ? this.state.user.first_name + '\'s Family' : this.state.user.first_name
				profile_pic = this.renderProfilePicture(this.state.user.family_photo)
			}

			return (
        		<div className="container p-1">
        			<h4>{ header }</h4>
        			<article><img src={ profile_pic } alt="profile_pic" height="300" /></article>
				</div>
			)
		}
	}
