import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Constants } from './constants'
import { 
    About, 
    Account, 
    App, 
    EditProfile,
    Home, 
    Login,
    Profile,
    Register 
  } from './containers'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/user/:username" component={Profile}/>
        <Route path="/user/:username/edit" component={EditProfile}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
    </Route>
)