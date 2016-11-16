import React from 'react'
import { UserStory } from '../../components'

	export default class Profile extends React.Component {
		constructor(props) {
			super(props)

			this.state = {}

			this.api = {
				url: props.route.containerData.api.url
			}

			this.fetchUserData = this.fetchUserData.bind(this)
			this.handleDonate = this.handleDonate.bind(this)
		}
		fetchUserData() {
			$.ajax({
				url: this.api.url + 'user/' + this.props.params.username,
				type: 'GET'
			}).done((res) => {
				res.address = '1234 test address, SF, CA 94132'
				this.setState({ user: res })
			}).fail((error) => {
				// user does not exist, move back to home page
				this.props.router.push('/')
			})
		}
		renderProfilePicture(imgStr) {
			return 'data:image/png;base64,' + imgStr
		}
		handleDonate() {
			// $.ajax({
			// 	url: this.api.url + 'user/' + this.props.params.username,
			// 	type: 'GET'
			// }).done((res) => {
			// 	this.setState({ user: res })
			// }).fail((error) => {
			// 	// user does not exist, move back to home page
			// 	this.props.router.push('/')
			// })
			console.log(this.state.user.address)
		}

		componentDidMount() {
			this.fetchUserData()
		}

		render() {
			let user = {}

			if (this.state.user) {
				user = this.state.user				
				user.family_photo = this.renderProfilePicture(user.family_photo)
			}
			let header = user.account_type == 'family' ? user.first_name + '\'s Family' : user.first_name			

			return (
        		<div className="profile container p-1">
					<UserStory user={user}>{ header }</UserStory>
					<button type="button" className="btn btn-success btn-lg" onClick={this.handleDonate}>Donate</button>					
				</div>
			)
		}
	}
