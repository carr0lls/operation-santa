import React from 'react'
import 'whatwg-fetch'
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
			fetch(this.api.url + 'user?account_type=family')
				.then((response) => {
					return response.json()
				})
				.then((json) => {
					this.setState({ users: json })
				})
				.catch((ex) => {
					// user does not exist, move back to home page
					console.log('failed to retrieve users list', ex)
				})
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
				userList.push(
					<li key={user.id} className="list-group-item">
						<a href={ '/user/' + user.id }>
							<UserStory user={user}>{ user.first_name + '\'s Family' }</UserStory>
						</a>
					</li>
				)
			})

			return (
				<div className="home row mx-auto p-1 mt-3">
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
