import React from 'react';
import { Switch, Route } from 'react-router';
import { 
    About, 
    Account, 
    App, 
    EditProfile,
    Home, 
    Login,
    Profile,
    Register 
  } from './containers';

export default () => (
    <App>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/user/:username" component={Profile}/>
            <Route path="/settings" component={EditProfile}/>
            <Route path="/about" component={About}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </App>
);