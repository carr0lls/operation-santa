import React from 'react'

export default class EditProfile extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		console.log('componentWillMount', this.props)
	}

	componentDidMount() {
		console.log('componentDidMount', this.props)
	}
	
	render() {
		let form
		if (this.props.user) {
			form = <DonorAccountRegisterForm onSubmitForm={this.submitForm}/>
		}
		return (
				<div>
					<h2>Edit {this.props.params.username}&#36;s Profile</h2>
					{ form }
				</div>
			)
	}
}