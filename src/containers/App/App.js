import React from 'react'
import { NavBar } from '../../components'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    )
  }
}
