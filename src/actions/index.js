import axios from 'axios';
import { push } from 'react-router-redux';

// https://stackoverflow.com/questions/34930735/pros-cons-of-using-redux-saga-with-es6-generators-vs-redux-thunk-with-es7-async

export const authenticate = (userData) => async (dispatch) => {
	dispatch({ type: 'AUTH_BEGIN' });

	try {
		if (userData !== undefined) {
			dispatch({ type: 'FETCH_USER_REQUEST' });

			const { data } = await axios.post('https://api-operation-santa.herokuapp.com/api/session', userData);
			dispatch({ type: 'FETCH_USER_SUCCESS', response: data });
		}
		dispatch({ type: 'AUTH_COMPLETE' });		
	}
	catch (e) {
		dispatch({ type: 'FETCH_USER_FAIL', error: e });

		dispatch({ type: 'AUTH_COMPLETE' });

		dispatch(push('/'));
	}	
}

export const skipAuthentication = () => {
	return { type: 'AUTH_COMPLETE' };
}

export const login = (formData) => async (dispatch) => {
	try {
		dispatch({ type: 'USER_LOGIN_REQUEST' });

		dispatch({ type: 'FETCH_USER_REQUEST' });

		const { data } = await axios.post(`https://api-operation-santa.herokuapp.com/api/session`, formData);
		dispatch({ type: 'FETCH_USER_SUCCESS', response: data });

		dispatch({ type: 'USER_LOGIN_SUCCESS' });

		dispatch({ type: 'USER_LOGIN_PERSIST' });

        dispatch(push('/'));
	}
	catch (e) {
		dispatch({ type: 'FETCH_USER_FAIL', error: e });

		dispatch({ type: 'USER_LOGIN_FAIL' });
	}
}

export const logout = () => (dispatch) => {
	dispatch({ type: 'USER_LOGOUT_REQUEST' });

	dispatch(push('/'));
}

export const fetchUserProfile = (uid) => async (dispatch) => {
	try {
		dispatch({ type: 'FETCH_USER_PROFILE_REQUEST' });

		const { data } = await axios.get(`https://api-operation-santa.herokuapp.com/api/user/${uid}`);
		dispatch({ type: 'FETCH_USER_PROFILE_SUCCESS', response: data });
	}
	catch (e) {
		dispatch({ type: 'FETCH_USER_PROFILE_FAIL', error: e });
		// user does not exist, move back to home page
		dispatch(push('/'));
	}
}

export const fetchAllUsers = (options) => async (dispatch) => {
	try {
		dispatch({ type: 'FETCH_ALL_USERS_REQUEST'});

		const { data } = await axios.get(`https://api-operation-santa.herokuapp.com/api/user?account_type=${options.account_type}`)
		dispatch({ type: 'FETCH_ALL_USERS_SUCCESS', response: data });
	}
	catch (e) {
		dispatch({ type: 'FETCH_ALL_USERS_FAIL' });
	}
}
