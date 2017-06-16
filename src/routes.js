import React from 'react';
import { Switch, Route } from 'react-router';
import { Constants } from './constants';
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

/*export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/user/:username" component={Profile}/>
        <Route path="/settings" component={EditProfile}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
    </Route>
);*/

const routes = [
  { path: '/',
    component: App
    // loadData: () => getSomeData(),
  }/*,
  { path: '/',
    component: Home,
    exact: true
    // loadData: () => getSomeData(),
  },
  { path: '/user/:username',
    component: Profile
    // loadData: () => getSomeData(),
  },
  { path: '/settings',
    component: EditProfile
    // loadData: () => getSomeData(),
  },
  { path: '/about',
    component: About
    // loadData: () => getSomeData(),
  },
  { path: '/login',
    component: Login
    // loadData: () => getSomeData(),
  },
  { path: '/register',
    component: Register
    // loadData: () => getSomeData(),
  }*/
];
/*
            navbar = <NavBar user={this.props.user} onLogout={this.logout} />;
<App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/teachers" component={Teachers} />
                <Courses>
                    <Route path="/courses/html" component={HTML} />
                    <Route path="/courses/css" component={CSS} />
                    <Route path="/courses/javascript" component={JavaScript} />
                </Courses>
            </Switch>
        </App>*/

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