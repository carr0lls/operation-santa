import React from 'react';
import NavLink from './NavLink';

const NavBar = ({user, onLogout}) => {
    let navlinks;

    // Temp resolution to disable server-side rendering because of authentication requirement
    if (user && user.hasOwnProperty('first_name')) { 
        // Client-side re-render if user is logged in
        navlinks = (
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                </li>        
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/user/' + user.id}>{user['first_name']}</NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={onLogout}>Logout</a>
                </li>
            </ul>
        );
    }
    else if (user) {
        // Client-side re-render if user is anonymous
        navlinks =  (
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Sign Up</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
            </ul>
        );
    }
    else {
        // Server-side and client-side initial render
        navlinks =  (
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-full navbar-dark bg-danger mb-2">
            <NavLink className="navbar-brand" to="/" onlyActiveOnIndex>Operation Santa</NavLink>
            {navlinks}
        </nav>
    );

};

export default NavBar;