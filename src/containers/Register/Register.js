import React from 'react'
import classnames from 'classnames'
import 'whatwg-fetch'
import { FamilyAccountRegisterForm, DonorAccountRegisterForm } from '../../components'

	export default class Register extends React.Component {
		static get contextTypes() {
		    return {
		        data: React.PropTypes.object
		    }
		}
		constructor(props, context) {
			super(props)
			this.state = {}
			this.api = {
				url: context.data.api.url
			}

			this.toggleFormOne = this.toggleFormOne.bind(this)
			this.toggleFormTwo = this.toggleFormTwo.bind(this)
			this.submitForm = this.submitForm.bind(this)
			this.handleLogin = this.handleLogin.bind(this)
		}
		toggleFormOne() {
			this.setState({active: this.state.active = 1})
		}
		toggleFormTwo() {
			this.setState({active: this.state.active = 2})
		}
		handleLogin(user) {
			this.props.onLogin(user)
		}
		submitForm(data) {
			console.log(data)
			$.ajax({
				url: this.api.url + 'user',
				type: 'POST',
				data
			}).done((res) => {
				this.handleLogin(res)
			})			
/*			fetch(this.api.url + 'user', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				body: data
			})
				.then((response) => { 
					return response.json()
				})
				.then((json) => {
					localStorage.setItem('profile', JSON.stringify(json))
					alert('Successfully registered')
					console.log(json)
					this.props.router.push('/')
				})
				.catch((ex) => {
					console.log('Failed to get register account')
				})*/
		}

		render() {
			let toggleOneClasses = classnames('btn btn-secondary', {'active': this.state.active === 1})
			let toggleTwoClasses = classnames('btn btn-secondary', {'active': this.state.active === 2})
			let formOneClasses = classnames('', {'hidden-xl-down': this.state.active !== 1})
			let formTwoClasses = classnames('', {'hidden-xl-down': this.state.active !== 2})
			return (
				<div className="register row p-1">
					<div className="register-btn-group mb-2 mx-auto">
						<div className="btn-group" role="group">
						  <button type="button" className={toggleOneClasses} onClick={this.toggleFormOne}>
						  	Adopt Family
						  </button>
						  <button type="button" className={toggleTwoClasses} onClick={this.toggleFormTwo}>
						  	Nominate Family
						  </button>
						</div>
					</div>
					<DonorAccountRegisterForm className={formOneClasses} onSubmitForm={this.submitForm}/>					
					<FamilyAccountRegisterForm className={formTwoClasses} onSubmitForm={this.submitForm}/>
				</div>
			)
		}
	}
