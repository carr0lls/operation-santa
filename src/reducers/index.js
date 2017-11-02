import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './HomeReducer';
import login from './LoginReducer';
import profile from './ProfileReducer';
import register from './RegisterReducer';
import settings from './SettingsReducer';
import user from './UserReducer';

const rootReducer = combineReducers({
	// persisted,
	home,
	login,
	profile,
	register,
	settings,
	user,
	router: routerReducer,
});

export default rootReducer;