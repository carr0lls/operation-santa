const initialState = {
	form: {},
	isLoggingIn: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_REQUEST':
			return Object.assign({}, state, {
				isLoggingIn: true
			});
		case 'LOGIN_SUCCESS':
			return Object.assign({}, state, {
				isLoggingIn: false
			});
		case 'LOGIN_FAIL':
			return Object.assign({}, state, {
				isLoggingIn: false
			});
		case 'UPDATE_LOGIN_FORM':
			return Object.assign({}, state, {
				form: action.data
			})
		default:
			return state;
	}
}