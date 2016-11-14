import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Constants } from './constants'
import { 
    About, 
    Account, 
    App, 
    Home, 
    Login,
    Profile,
    Register 
  } from './containers'

const containerData = {
  api: {
    url: Constants.API_FETCH_URL,
    pollInterval: Constants.API_REFRESH_INTERVAL
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute containerData={containerData} component={Home}/>
    <Route path="/user" containerData={containerData} component={Profile}>
      <Route path="/user/:userName/:repoName" component={Profile}/>
    </Route>
    <Route path="/about" component={About}/>
    <Route path="/login" containerData={containerData} component={Login}/>
    <Route path="/register" containerData={containerData} component={Register}/>
  </Route>
)