import React from 'react'

	export default class Home extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				users: {}
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
				url: this.api.url + 'user',
				type: 'GET'
			}).done((res) => {
				this.setState({ users: res })
			})
		}

		submitForm() {
			
		}

		componentDidMount() {
			this.fetchData()
			setInterval(this.fetchData, this.api.refresh)
		}

		render() {
			let user, userList = []
			Object.keys(this.state.users).map((key) => {
				user = this.state.users[key]
				userList.push(<li className="list-group-item"><a key={key} href="">{user.first_name} {user.last_name}</a></li>)
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
