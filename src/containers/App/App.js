import React from 'react'
import { NavLink } from '../../components'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Operation Santa</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
