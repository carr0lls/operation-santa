const initialState = {
	isFetchingUsers: false,
	users: {}
}

export default function(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_ALL_USERS_REQUEST':
			return Object.assign({}, state, {
				isFetchingUsers: true	
			});
		case 'FETCH_ALL_USERS_SUCCESS':
			return Object.assign({}, state, {
				isFetchingUsers: false,	
				users: action.response
			});
		case 'FETCH_ALL_USERS_FAIL':
			return Object.assign({}, state, {
				isFetchingUsers: false,
				users: {
					error: action.error
				}
			});
		default:
			return state;
	}
}