import React from 'react'
import { NavBar } from '../../components'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: this.props.route.containerData.user }

    this.updateAuth = this.updateAuth.bind(this)
  }
  updateAuth(user) {
    this.setState({ user })
  }

  render() {
    return (
      <div>
        <NavBar {...this.state} />
        {this.props.children}
      </div>
    )
  }
}
