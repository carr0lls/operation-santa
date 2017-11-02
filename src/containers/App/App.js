import React from 'react';
import { connect } from 'react-redux';
import { authenticate, skipAuthentication, login, logout } from '../../actions';
import { NavBar } from '../../components';

class App extends React.Component {
    login = user => {
        this.props.dispatch(login(user));
    };

    logout = () => {
        this.props.dispatch(logout(this.props.user));
    };

    authenticate = user => {
        if (user.persisted)
            this.props.dispatch(authenticate({ session_token: user.persisted.t }));
        else
            this.props.dispatch(skipAuthentication());
    };

    componentDidMount() {
        this.authenticate(this.props.user);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.router.location.pathname !== this.props.router.location.pathname) {
            this.authenticate(nextProps.user);
        }
    }    

    render() {
        const navbar = <NavBar user={this.props.user} onLogout={this.logout} />;
        
        return (
            <div>
                { navbar }
                <div className="container">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

function mapStateToProps({ user, router }) {
    return { 
        user,
        router,
    };
};

export default connect(mapStateToProps)(App);
