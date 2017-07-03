import axios from 'axios';
import { push } from 'react-router-redux';
import { Constants } from '../constants';

// https://stackoverflow.com/questions/34930735/pros-cons-of-using-redux-saga-with-es6-generators-vs-redux-thunk-with-es7-async

export const authenticate = (userData) => async (dispatch) => {
	dispatch({ type: 'AUTH_BEGIN' });

	try {
		if (userData !== undefined) {
			dispatch({ type: 'FETCH_USER_REQUEST' });

			const { data } = await axios.post(`${Constants.API_FETCH_URL}session`, userData);
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
		dispatch({ type: 'LOGIN_REQUEST' });

		dispatch({ type: 'FETCH_USER_REQUEST' });

		const { data } = await axios.post(`${Constants.API_FETCH_URL}session`, formData);
		dispatch({ type: 'FETCH_USER_SUCCESS', response: data });

		dispatch({ type: 'LOGIN_SUCCESS' });

		dispatch({ type: 'USER_LOGIN_PERSIST', data: data });

        dispatch(push('/'));
	}
	catch (e) {
		dispatch({ type: 'FETCH_USER_FAIL', error: e });

		dispatch({ type: 'LOGIN_FAIL' });
	}
}

export const logout = ({session_token}) => async (dispatch) => {
	try {
		dispatch({ type: 'USER_LOGOUT_REQUEST' });

		const config = { data: { session_token } };

		const { data } = await axios.delete(`${Constants.API_FETCH_URL}session`, config);

		dispatch({ type: 'USER_LOGOUT_SUCCESS' });

		dispatch(push('/'));
	}
	catch (e) {
		dispatch({ type: 'USER_LOGOUT_FAIL', error: e });
	}
}

export const fetchUserProfile = (uid) => async (dispatch) => {
	try {
		dispatch({ type: 'FETCH_USER_PROFILE_REQUEST' });

		const { data } = await axios.get(`${Constants.API_FETCH_URL}user/${uid}`);
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

		const { data } = await axios.get(`${Constants.API_FETCH_URL}user?account_type=${options.account_type}`)
		dispatch({ type: 'FETCH_ALL_USERS_SUCCESS', response: data });
	}
	catch (e) {
		dispatch({ type: 'FETCH_ALL_USERS_FAIL', error: e });
	}
}

export const setModalStep = (step = 1) => {
	return { 
		type: 'SET_MODAL_STEP',
		data: step
	}	
}

export const getEstimateFromPostmates = (deliveryData) => async (dispatch) => {
	try {
		dispatch({ type: 'FETCH_POSTMATES_ESTIMATE_REQUEST' });

		const { data } = await axios.post(`${Constants.API_FETCH_URL}postmates/get_estimate`, deliveryData);
		// Format response data
		const fee = data.fee.toString();
		data.fee = fee.substring(0, fee.length-2) + "." + fee.substring(fee.length-2, fee.length);
		const dropoff_eta = new Date(data.dropoff_eta);
		data.dropoff_eta = dropoff_eta.toLocaleString();
		dispatch({ type: 'FETCH_POSTMATES_ESTIMATE_SUCCESS', response: data });

		// Move modal to page 2
		dispatch(setModalStep(2));	
	}
	catch (e) {
		dispatch({ type: 'FETCH_POSTMATES_ESTIMATE_FAIL', error: e.message });
		alert(e.message);
	}
}

export const createPostmatesDelivery = (deliveryData) => async (dispatch) => {
	try {
		dispatch({ type: 'CREATE_POSTMATES_DELIVERY_REQUEST' });
		$('.modal-footer button div').addClass('progress');	

		const { data } = await axios.post(`${Constants.API_FETCH_URL}postmates/create_delivery`, deliveryData);
		dispatch({ type: 'CREATE_POSTMATES_DELIVERY_SUCCESS', response: data.status });

		// Move modal to page 3
		$('.modal-footer button div').removeClass('progress');
		dispatch(setModalStep(3));
	}
	catch (e) {
		dispatch({ type: 'CREATE_POSTMATES_DELIVERY_FAIL', error: e.message });
		$('.modal-footer button div').removeClass('progress');
		alert(e.message);
	}
}

export const updateDeliveryModalForm = (formData) => {
	return { type: 'UPDATE_DELIVERY_MODAL_FORM', data: formData };
}

export const toggleRegistrationForm = (formNumber) => {
	return { type: 'TOGGLE_REGISTRATION_FORM', data: formNumber };
}

export const updateRegistrationForm = (formData) => {
	return { type: 'UPDATE_REGISTRATION_FORM', data: formData };
}

export const registerNewUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: 'CREATE_NEW_USER_REQUEST' });

		const { data } = await axios.post(`${Constants.API_FETCH_URL}user`, userData);
		dispatch({ type: 'CREATE_NEW_USER_SUCCESS' });

		dispatch({ type: 'USER_LOGIN_PERSIST', data: data });

		dispatch(push('/'));

	}
	catch (e) {
		dispatch({ type: 'CREATE_NEW_USER_FAIL', error: e.message });
		alert(e.message);
	}
}

export const updateLoginForm = (formData) => {
	return { type: 'UPDATE_LOGIN_FORM', data: formData };
}

export const updateUserSettingsForm = (formData) => {
	return { type: 'UPDATE_USER_SETTINGS_FORM', data: formData }
}

export const updateUserSettings = (uid, userData) => async (dispatch) => {
	try {
		dispatch({ type: 'UPDATE_USER_SETTINGS_REQUEST' });

		const { data } = await axios.put(`${Constants.API_FETCH_URL}user/${uid}`, userData);
		dispatch({ type: 'UPDATE_USER_SETTINGS_SUCCESS' });

		dispatch(push('/settings'));
	}
	catch (e) {
		dispatch({ type: 'UPDATE_USER_SETTINGS_FAIL' });
	}
}