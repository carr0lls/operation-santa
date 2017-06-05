import React from 'react';
import request from 'superagent';
import { NavBar } from '../../components';
import { Constants } from '../../constants';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.api = { url: Constants.API_FETCH_URL };

        this.userAuth = this.userAuth.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    userAuth(user) {
        request
            .post(this.api.url + 'session')
            .send(user)
            .end((err, result) => {
                if (err) {
                    alert(err.responseJSON.error);
                }
                else {
                    this.login(result.body);
                }
            });
    }
    login(user) {
        localStorage.setItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE, JSON.stringify({t: user.session_token}));
        this.setState({ user });
        this.props.router.push('/');
    }
    logout() {
        localStorage.removeItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE);
        this.setState({ user: {} });
        this.props.router.push('/');
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE));
        if (data) {
            request
                .post(this.api.url + 'session')
                .send({ session_token: data.t })
                .end((err, result) => {
                    if (err) {
                        localStorage.removeItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE);
                        // re-render navbar as anonymous user
                        this.setState({ user: {} });
                    }
                    else {
                        // re-render navbar as user
                        this.setState({ user: result.body });
                    }
                });
        }
        else {
            // re-render navbar as anonymous user
            this.setState({ user: {} });
        }
    }

    render() {
        let navbar = <NavBar {...this.state} onLogout={this.logout} />;
        
        return (
            <div>
                { navbar }
                <div className="container">
                    { React.cloneElement(this.props.children, { user: this.state.user, onAuth: this.userAuth, onLogin: this.login }) }
                </div>
            </div>
        );
    }
};
