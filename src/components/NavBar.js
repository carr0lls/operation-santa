import React from 'react';
import NavigationLink from './NavigationLink';

const NavBar = ({user, onLogout}) => {
    let navlinks;

    if (!user.authComplete) {
        // Server-side and client-side initial render
        navlinks =  (
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <NavigationLink className="nav-link" to="/about">About</NavigationLink>
                </li>
            </ul>
        );
    }
    // Temp resolution to disable server-side rendering because of authentication requirement
    else if (user.authComplete && user.isLoaded) { 
        // Client-side re-render if user is logged in
        navlinks = (
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <NavigationLink className="nav-link" to="/about">About</NavigationLink>
                </li>        
                <li className="nav-item">
                    <NavigationLink className="nav-link" to={'/user/' + user.id}>{user['first_name']}</NavigationLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={onLogout}>Logout</a>
                </li>
            </ul>
        );
    }
    else {
        // Client-side re-render if user is anonymous
        navlinks =  (
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <NavigationLink className="nav-link" to="/about">About</NavigationLink>
                </li>
                <li className="nav-item">
                    <NavigationLink className="nav-link" to="/register">Sign Up</NavigationLink>
                </li>
                <li className="nav-item">
                    <NavigationLink className="nav-link" to="/login">Login</NavigationLink>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-full navbar-dark bg-danger mb-2">
            <NavigationLink className="navbar-brand" to="/">Operation Santa</NavigationLink>
            { navlinks }
        </nav>
    );

};

export default NavBar;