import React from 'react'

	export default class Login extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				data: []
			}
			this.api = {
				url: props.route.containerData.api.url,
				refresh: props.route.containerData.api.pollInterval
			}

			this.renderData = this.renderData.bind(this)
			this.submitForm = this.submitForm.bind(this)
		}

		renderData() {

		}

		submitForm() {
			
		}

		render() {
			return (
				<div className="container p-1">
					Login Page
				</div>
			)
		}
	}
