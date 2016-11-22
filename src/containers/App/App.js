import React from 'react'
import { NavBar } from '../../components'
import { Constants } from '../../constants'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { user: this.props.route.containerData.user }
        this.api = { url: Constants.API_FETCH_URL }

        this.userAuth = this.userAuth.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }
    userAuth(user) {
        $.ajax({
            url: this.api.url + 'session',
            type: 'POST',
            data: user
        })
        .done((res) => {
            this.login(res)
        })
        .fail((err) => {
            alert(err.responseJSON.error)
        })
    }
    login(user) {
        localStorage.setItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE, JSON.stringify(user))
        this.setState({ user })        
        this.props.router.push('/')
    }
    logout() {
        if (localStorage) 
            localStorage.removeItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE)

        this.setState({ user: {} })
        this.props.router.push('/')
    }

    render() {
        // temp resolution to disable server-side rendering because of authentication requirement
        let navbar = <NavBar {...this.state} onLogout={this.logout} />
        
        return (
            <div>
                { navbar }
                <div className="container">
                    { React.cloneElement(this.props.children, { onAuth: this.userAuth, onLogin: this.login }) }
                </div>
            </div>
        )
    }
}
