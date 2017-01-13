import React from 'react';
import classnames from 'classnames';
import 'whatwg-fetch';
import { FamilyAccountRegisterForm, DonorAccountRegisterForm } from '../../components';

	export default class Register extends React.Component {
		static get contextTypes() {
		    return {
		        data: React.PropTypes.object
		    }
		}
		constructor(props, context) {
			super(props);
			this.state = {form: {1: {account_type: 'donor'}, 2: {account_type: 'family', family_size: 1}}};
			this.api = {
				url: context.data.api.url
			}

			this.toggleFormOne = this.toggleFormOne.bind(this);
			this.toggleFormTwo = this.toggleFormTwo.bind(this);
			this.updateForm = this.updateForm.bind(this);
			this.submitForm = this.submitForm.bind(this);
			this.handleLogin = this.handleLogin.bind(this);
		}
		toggleFormOne() {
			this.setState({active: this.state.active = 1});
		}
		toggleFormTwo() {
			this.setState({active: this.state.active = 2});
		}
		handleLogin(user) {
			this.props.onLogin(user);
		}
		updateForm(e) {
			let formState = this.state.form;
			let newState = {};

			if (e.target.name === 'family_photo') {
				const reader = new FileReader();
		   		reader.onload = (evt) => {
		   			newState = {'family_photo': evt.target.result.substr(evt.target.result.indexOf(",") + 1, evt.target.result.length)};
		   			formState[this.state.active] = Object.assign(formState[this.state.active], newState);
					this.setState({form: formState});
		   		}
		   		reader.readAsDataURL(e.target.files[0]);
			}
			else {
				newState[e.target.name] = e.target.value;
				formState[this.state.active] = Object.assign(formState[this.state.active], newState);
				this.setState({form: formState});
			}
		}
		submitForm(e) {
			e.preventDefault();
			const data = this.state.form[this.state.active];

			$.ajax({
				url: this.api.url + 'user',
				type: 'POST',
				data
			}).done((res) => {
				this.handleLogin(res);
			});
/*			fetch(this.api.url + 'user', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				body: data
			})
				.then((response) => { 
					return response.json();
				})
				.then((json) => {
					this.handleLogin(json);
				})
				.catch((ex) => {
					console.log('Failed to get register account');
				})*/
		}

		render() {
			let toggleOneClasses = classnames('btn btn-secondary', {'active': this.state.active === 1});
			let toggleTwoClasses = classnames('btn btn-secondary', {'active': this.state.active === 2});
			let formOneClasses = classnames('', {'hidden-xl-down': this.state.active !== 1});
			let formTwoClasses = classnames('', {'hidden-xl-down': this.state.active !== 2});
			
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
					<DonorAccountRegisterForm className={formOneClasses} onSubmitForm={this.submitForm} onUpdateForm={this.updateForm}/>					
					<FamilyAccountRegisterForm className={formTwoClasses} onSubmitForm={this.submitForm} onUpdateForm={this.updateForm}/>
				</div>
			);
		}
	}
