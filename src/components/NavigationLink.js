import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationLink = props => <NavLink {...props} activeClassName="active"/>;

export default NavLink;
