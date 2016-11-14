import React from 'react'

	export default class Home extends React.Component {
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
				<div className="home container mx-auto p-1 mt-3">
					<header>
						<h1 className="header-title animated slideInUp">OPERATION SANTA</h1>
					</header>
				</div>
			)
		}
	}
