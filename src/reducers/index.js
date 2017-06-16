import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import persisted from './LocalStorageReducer';
import user from './UserReducer';
import home from './HomeReducer';
import profile from './ProfileReducer';

const rootReducer = combineReducers({
	// persisted,
	user,
	home,
	profile,
	router: routerReducer
});

export default rootReducer;