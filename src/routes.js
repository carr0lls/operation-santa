import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { 
    About, 
    Account, 
    App, 
    Home, 
    Login,
    Profile,
    Registration 
  } from './containers'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/user" component={Profile}>
      <Route path="/user/:userName/:repoName" component={Profile}/>
    </Route>
    <Route path="/about" component={About}/>
  </Route>
)