const initialState = {
	form: {},
	isUpdating: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_USER_SETTINGS_REQUEST':
			return Object.assign({}, state, {
				isUpdating: true
			});
		case 'UPDATE_USER_SETTINGS_SUCCESS':
			return Object.assign({}, state, {
				isUpdating: false
			});
		case 'UPDATE_USER_SETTINGS_FAIL':
			return Object.assign({}, state, {
				isUpdating: false
			});
		case 'UPDATE_USER_SETTINGS_FORM':
			return Object.assign({}, state, {
				form: action.data
			});
		default:
			return state;
	}
};