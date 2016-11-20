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
    user = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE))
}

const containerData = {
    user
}

export default (
    <Route path="/" containerData={containerData} component={App}>
        <IndexRoute component={Home}/>
        <Route path="/user/:username" component={Profile}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
    </Route>
)