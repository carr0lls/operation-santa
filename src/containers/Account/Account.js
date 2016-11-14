import React from 'react'

	export default class Account extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				data: []
			}
			this.api = {
				url: 'url', 
				refresh: 1234
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
				<div>
					Account Page
				</div>
			)
		}
	}
