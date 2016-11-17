import React from 'react'

	export default class Account extends React.Component {
		constructor(props) {
			super(props)
			this.state = {}

			this.renderData = this.renderData.bind(this)
			this.submitForm = this.submitForm.bind(this)
		}

		renderData() {

		}

		submitForm() {
			
		}

		render() {
			return (
				<div className="row p-1">
					Account Page
				</div>
			)
		}
	}
