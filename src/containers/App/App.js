import React from 'react'
import { NavLink } from '../../components'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-faded">
          <a className="navbar-brand" href="#">Operation Santa</a>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onlyActiveOnIndex>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="http://example.com" id="supportedContentDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div className="dropdown-menu" aria-labelledby="supportedContentDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
          <form className="form-inline float-xs-right">
            <input className="form-control" type="text" placeholder="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
