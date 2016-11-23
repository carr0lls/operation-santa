import React from 'react'
import NavLink from './NavLink'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout() {
    this.props.onLogout()
  }

  render() {
    let navlinks
    
    // Temp resolution to disable server-side rendering because of authentication requirement
    if (this.props.user && this.props.user.hasOwnProperty('first_name')) { 
      // Client-side re-render if user is logged in
      navlinks = (
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>        
          <li className="nav-item">
            <NavLink className="nav-link" to={'/user/' + this.props.user.id}>{this.props.user['first_name']}</NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={this.handleLogout}>Logout</a>
          </li>
        </ul>
      )
    }
    else if (this.props.user) {
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
      )
    }
    else {
      // Server-side and client-side initial render
      navlinks =  (
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>
        </ul>
      )      
    }

    return (
        <nav className="navbar navbar-full navbar-dark bg-danger mb-2">
          <NavLink className="navbar-brand" to="/" onlyActiveOnIndex>Operation Santa</NavLink>
          {navlinks}
        </nav>
      )
  }
}