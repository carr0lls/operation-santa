import React from 'react'
import classnames from 'classnames'
import 'whatwg-fetch'
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
			}).done((res) => {
				localStorage.setItem('profile', JSON.stringify(res))
				alert('Successfully registered')
				console.log(res)
				this.props.router.push('/')				
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
				<div className="register container p-1">
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
