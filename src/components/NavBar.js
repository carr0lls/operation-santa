import React from 'react'
import NavLink from './NavLink'

export default class NavBar extends React.Component {
  render() {
    return (
        <nav className="navbar navbar-full navbar-dark bg-danger mb-2">
          <NavLink className="navbar-brand" to="/" onlyActiveOnIndex>Operation Santa</NavLink>
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
        </nav>
      )
  }
}