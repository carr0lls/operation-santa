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
			this.props.onLogin(user)
		}
		submitForm(data) {
			console.log(data)
			// this.handleLogin(res)
		}

		render() {
			return (
				<div className="row p-1">
					<LoginForm onSubmitForm={this.submitForm} />
				</div>
			)
		}
	}
