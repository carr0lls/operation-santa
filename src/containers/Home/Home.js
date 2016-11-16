import React from 'react'
import { UserStory } from '../../components'

	export default class Home extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				users: []
			}
			this.api = {
				url: props.route.containerData.api.url,
				refresh: props.route.containerData.api.pollInterval
			}

			this.fetchData = this.fetchData.bind(this)
			this.submitForm = this.submitForm.bind(this)
		}
		fetchData() {
			$.ajax({
				url: this.api.url + 'user?account_type=family',
				type: 'GET'
			}).done((res) => {
				this.setState({ users: res })
			})
		}
		renderProfilePicture(imgStr) {
			return 'data:image/png;base64,' + imgStr
		}
		submitForm() {
			
		}

		componentDidMount() {
			this.fetchData()
			setInterval(this.fetchData, this.api.refresh)
		}

		render() {
			let userList = []
			this.state.users.map((user) => {

				if (user.family_photo)
					user.family_photo = this.renderProfilePicture(user.family_photo)

				userList.push(
					<li key={user.id} className="list-group-item">
						<a href={ '/user/' + user.id }>
							<UserStory user={user}>{ user.first_name + '\' Family' }</UserStory>
						</a>
					</li>
				)
			})

			return (
				<div className="home container mx-auto p-1 mt-3">
					<header>
						<h1 className="header-title animated slideInUp">Operation Santa</h1>
						<ul className="list-group">
							{ userList }
						</ul>
					</header>
				</div>
			)
		}
	}
