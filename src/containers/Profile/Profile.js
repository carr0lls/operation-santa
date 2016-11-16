import React from 'react'

	export default class Profile extends React.Component {
		constructor(props) {
			super(props)

			this.state = {}

			this.api = {
				url: props.route.containerData.api.url
			}

			this.fetchUserData = this.fetchUserData.bind(this)
			this.submitForm = this.submitForm.bind(this)
		}
		fetchUserData() {
			$.ajax({
				url: this.api.url + 'user/' + this.props.params.username,
				type: 'GET'
			}).done((res) => {
				this.setState({ user: res })
			}).fail((error) => {
				// user does not exist, move back to home page
				this.props.router.push('/')
			})
		}
		renderProfilePicture(imgStr) {
			return 'data:image/png;base64,' + imgStr
		}
		submitForm() {
			
		}

		componentDidMount() {
			this.fetchUserData()
		}

		render() {
			let header = `Profile page`
			let profile_pic = `Profile picture`
			let family_story = `Family story`

			let user = this.state.user

			if (user) {
				header = user.account_type == 'family' ? user.first_name + '\'s Family' : user.first_name
				profile_pic = this.renderProfilePicture(user.family_photo)
				family_story = user.family_story
			}

			return (
        		<div className="container p-1">
        			<h4>{ header }</h4>
        			<article><img src={ profile_pic } alt="profile_pic" height="300" /></article>
        			<div>Story</div>
					<p>{family_story}</p>
				</div>
			)
		}
	}
