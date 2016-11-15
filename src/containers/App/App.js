import React from 'react'
import { NavBar } from '../../components'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.user = props.route.containerData.user
  }

  render() {
    return (
      <div>
        <NavBar user={this.user} />
        {this.props.children}
      </div>
    )
  }
}
