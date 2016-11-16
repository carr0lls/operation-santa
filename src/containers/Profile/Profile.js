import React from 'react'
import 'whatwg-fetch'
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
			fetch(this.api.url + 'user/' + this.props.params.username)
				.then((response) => {
					return response.json()
				})
				.then((json) => {
					json.address = '1234 test address, SF, CA 94132'
					this.setState({ user: json })
				})
				.catch((ex) => {
					// user does not exist, move back to home page
					this.props.router.push('/')
				})			
		}
		handleDonate() {
			let data = { pick_up: '1234 fill me in, SF, CA 94108', drop_off: this.state.user.address }
			console.log('get estimate:', data)
			$.ajax({
				url: this.api.url + 'postmates/get_estimate',
				type: 'POST',
				data
			}).done((res) => {
				console.log('Estimate:', res)		
			})
/*			fetch(this.api.url + 'postmates/get_estimate', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				body: data
			})
				.then((response) => { 
					return response.json()
				})
				.then((json) => {
					console.log('Estimate:', json)
				})
				.catch((ex) => {
					console.log('Failed to get estimate')
				})*/
		}

		componentDidMount() {
			this.fetchUserData()
		}

		render() {
			let user = {}

			if (this.state.user)
				user = this.state.user

			let header = user.account_type == 'family' ? user.first_name + '\'s Family' : user.first_name			

			return (
        		<div className="profile container p-1">
					<UserStory user={user}>{ header }</UserStory>
					<button type="button" className="btn btn-success btn-lg" onClick={this.handleDonate}>Donate</button>					
				</div>
			)
		}
	}
