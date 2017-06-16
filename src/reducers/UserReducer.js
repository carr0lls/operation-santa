// import { FETCH_PHOTOS } from '../actions/types';
import { loadState } from '../localStorage';

const persistedState = loadState();

const initialState = {
	authComplete: false,
	isFetchingUser: false,
	isLoaded: false
}

const initialPersistedState = Object.assign({}, initialState, persistedState);

export default function(state = initialPersistedState, action) {

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
				isLoaded: true
			});
		case 'FETCH_USER_FAIL':
			return Object.assign({}, initialState, { 
				error: action.error 
			});
		case 'USER_LOGIN_PERSIST':
			return Object.assign({}, state, {
				persisted: {
					t: state.session_token 
				}
			});
		case 'USER_LOGOUT_REQUEST':
			return Object.assign({}, initialState);
		default:
			return state;
	}
}