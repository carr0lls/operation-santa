import React from 'react'
import { Link } from 'react-router'
import 'whatwg-fetch'
import { UserStory } from '../../components'

	export default class Home extends React.Component {
		static get contextTypes() {
		    return {
		        data: React.PropTypes.object
		    }
		}
		constructor(props, context) {
			super(props, context)
			this.state = {
				users: context.data.users || {}
			}
			this.api = {
				url: context.data.api.url,
				refresh: context.data.api.pollInterval
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
			// setInterval(this.fetchData, this.api.refresh)
		}

		render() {
			let user, userList = []
			Object.keys(this.state.users).map((key) => {
				user = this.state.users[key]
				userList.push(
					<li key={user.id} className="list-group-item">
						<Link to={'/user/' + user.id} activeClassName="active">
							<UserStory user={user}>{ user.first_name + '\'s Family' }</UserStory>
						</Link>
					</li>
				)
			})

			return (
				<div className="home row mx-auto mt-3">
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
