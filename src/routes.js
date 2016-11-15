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

// temp implementation until serverside can provide user profile without checking localstorage
let user = {}
let browserStorage = (typeof localStorage === 'undefined') ? null : localStorage;
if (browserStorage) {
  user = JSON.parse(localStorage.getItem('profile'))
}

const containerData = {
  api: {
    url: Constants.API_FETCH_URL,
    pollInterval: Constants.API_REFRESH_INTERVAL
  },
  user
}

export default (
  <Route path="/" containerData={containerData} component={App}>
    <IndexRoute containerData={containerData} component={Home}/>
    <Route path="/user" containerData={containerData} component={Profile}>
      <Route path="/user/:userName/:repoName" component={Profile}/>
    </Route>
    <Route path="/about" component={About}/>
    <Route path="/login" containerData={containerData} component={Login}/>
    <Route path="/register" containerData={containerData} component={Register}/>
  </Route>
)