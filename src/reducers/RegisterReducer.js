const initialState = {
	form: {
		1: {
			account_type: 'donor'
		}, 
		2: {
			account_type: 'family', 
			family_size: 1
		}
	},
	active: null,
	isRegistering: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'TOGGLE_REGISTRATION_FORM':
			return Object.assign({}, state, {
				active: action.data
			});
		case 'UPDATE_REGISTRATION_FORM':
			return Object.assign({}, state, {
				form: action.data
			});
		case 'CREATE_NEW_USER_REQUEST':
			return Object.assign({}, state, {
				isRegistering: true
			});
		case 'CREATE_NEW_USER_SUCCESS':
			return Object.assign({}, state, {
				isRegistering: false
			});
		case 'CREATE_NEW_USER_FAIL':
			return Object.assign({}, state, {
				isRegistering: false
			});
		default:
			return state;	
	}
};