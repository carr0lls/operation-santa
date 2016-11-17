import React from 'react'
import { LoginForm } from '../../components'

	export default class Login extends React.Component {
		constructor(props) {
			super(props)
			this.state = {}

			this.renderData = this.renderData.bind(this)
			this.submitForm = this.submitForm.bind(this)
		}

		renderData() {

		}

		submitForm(data) {
			console.log(data)
		}

		render() {
			return (
				<div className="row p-1">
					<LoginForm onSubmitForm={this.submitForm} />
				</div>
			)
		}
	}
