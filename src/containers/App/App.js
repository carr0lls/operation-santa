import React from 'react'
import { NavBar } from '../../components'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: this.props.route.containerData.user }

    this.updateAuth = this.updateAuth.bind(this)
    this.logout = this.logout.bind(this)
  }
  updateAuth(user) {
    this.setState({ user })
  }
  logout() {
    if (localStorage) 
      localStorage.removeItem('profile')

    this.setState({ user: {} })
    this.props.router.push('/')
  }

  render() {
    return (
      <div>
        <NavBar {...this.state} onLogout={this.logout} />
        {this.props.children}
      </div>
    )
  }
}
