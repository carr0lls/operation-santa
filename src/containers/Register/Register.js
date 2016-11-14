import React from 'react'
import classnames from 'classnames'
// import 'whatwg-fetch'
import { FamilyAccountRegisterForm, DonorAccountRegisterForm } from '../../components'

	export default class Register extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				data: []
			}
			this.api = {
				url: props.route.containerData.api.url,
				refresh: props.route.containerData.api.pollInterval
			}
			this.toggleFormOne = this.toggleFormOne.bind(this)
			this.toggleFormTwo = this.toggleFormTwo.bind(this)
			this.submitForm = this.submitForm.bind(this)
		}

		toggleFormOne() {
			this.setState({active: this.state.active = 1})
		}

		toggleFormTwo() {
			this.setState({active: this.state.active = 2})
		}

		submitForm(data) {
			$.ajax({
				url: this.api.url + 'user',
				type: 'POST',
				data
			}).done(function(res) {
				alert('Successfully registered')
				console.log(res)
			});
		}

		render() {
			let toggleOneClasses = classnames('btn btn-secondary', {'active': this.state.active === 1})
			let toggleTwoClasses = classnames('btn btn-secondary', {'active': this.state.active === 2})
			let formOneClasses = classnames('', {'hidden-xl-down': this.state.active !== 1})
			let formTwoClasses = classnames('', {'hidden-xl-down': this.state.active !== 2})
			return (
				<div className="container">
					<div className="register-btn-group mb-2 mx-auto">
						<div className="btn-group" role="group">
						  <button type="button" className={toggleOneClasses} onClick={this.toggleFormOne}>Donate a Gift</button>
						  <button type="button" className={toggleTwoClasses} onClick={this.toggleFormTwo}>Receive a Gift</button>
						</div>
					</div>
					<DonorAccountRegisterForm className={formOneClasses} onSubmitForm={this.submitForm}/>					
					<FamilyAccountRegisterForm className={formTwoClasses} onSubmitForm={this.submitForm}/>
				</div>
			)
		}
	}
