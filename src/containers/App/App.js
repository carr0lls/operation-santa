import React from 'react'
import { NavBar } from '../../components'
import { Constants } from '../../constants'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
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
        localStorage.setItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE, JSON.stringify({t: user.session_token}))
        delete user.session_token
        this.setState({ user })
        this.props.router.push('/')
    }
    logout() {
        localStorage.removeItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE)
        this.setState({ user: {} })
        this.props.router.push('/')
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE))
        if (data) {
            $.ajax({
                url: Constants.API_FETCH_URL + 'session',
                type: 'POST',
                data: { session_token: data.t }
            })
            .done((user) => {
                delete user.session_token
                // re-render navbar as user
                this.setState({ user })
            })
            .fail((err) => {
                localStorage.removeItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE)
                // re-render navbar as anonymous user
                this.setState({ user: {} })
            })
        }
        else {
            // re-render navbar as anonymous user
            this.setState({ user: {} })
        }
    }

    render() {
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
