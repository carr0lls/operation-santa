import React from 'react'
import { LoginForm } from '../../components'

	export default class Login extends React.Component {
		constructor(props) {
			super(props)
			this.state = {}

			this.handleLogin = this.handleLogin.bind(this)
			this.submitForm = this.submitForm.bind(this)
		}
		handleLogin(user) {
			this.props.onAuth(user)
		}
		submitForm(data) {
			this.handleLogin(data)
		}

		render() {
			return (
				<div className="row p-1">
					<LoginForm onSubmitForm={this.submitForm} />
				</div>
			)
		}
	}
