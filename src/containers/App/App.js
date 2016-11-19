import React from 'react'
import { NavBar } from '../../components'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { user: this.props.route.containerData.user }

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }
    login(user) {
        localStorage.setItem('profile', JSON.stringify(user))
        this.setState({ user })        
        this.props.router.push('/')
    }
    logout() {
        if (localStorage) 
            localStorage.removeItem('profile')

        this.setState({ user: {} })
        this.props.router.push('/')
    }

    render() {
        // temp resolution to disable server-side rendering because of authentication requirement
        let navbar = (typeof localStorage === 'undefined') ? '' : <NavBar {...this.state} onLogout={this.logout} />
        
        return (
            <div>
                { navbar }
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
