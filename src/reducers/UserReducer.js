// import { FETCH_PHOTOS } from '../actions/types';
import { loadState } from '../localStorage';

const persistedState = loadState();

const initialState = {
	authComplete: false,
	isFetchingUser: false,
	isLoaded: false,
	error: null
};

const initialPersistedState = Object.assign({}, initialState, persistedState);

export default (state = initialPersistedState, action) => {
	switch (action.type) {
		case 'AUTH_BEGIN':
			return Object.assign({}, state, {
				authComplete: false
			});
		case 'AUTH_COMPLETE':
			return Object.assign({}, state, {
				authComplete: true
			});
		case 'FETCH_USER_REQUEST':
			return Object.assign({}, state, { 
				isFetchingUser: true
			});
		case 'FETCH_USER_SUCCESS':
			return Object.assign({}, state, action.response, { 
				isFetchingUser: false,
				isLoaded: true,
				error: null
			});
		case 'FETCH_USER_FAIL':
			return Object.assign({}, initialState, { 
				authComplete: true,
				error: action.error 
			});
		case 'USER_LOGIN_PERSIST':
			return Object.assign({}, state, {
				persisted: {
					t: action.data.session_token 
				}
			});
		case 'USER_LOGOUT_SUCCESS':
			return Object.assign({}, initialState);
		case 'USER_LOGOUT_FAIL':
			return Object.assign({}, state, {
				error: action.error
			});
		default:
			return state;
	}
};