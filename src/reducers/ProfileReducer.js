const initialState = { 
	isFetchingUserProfile: false 
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_USER_PROFILE_REQUEST':
			return Object.assign({}, {
				isFetchingUserProfile: true
			});
		case 'FETCH_USER_PROFILE_SUCCESS':
			return Object.assign({}, action.response, {
				isFetchingUserProfile: false
			});
		case 'FETCH_USER_PROFILE_FAIL':
			return Object.assign({}, {
				isFetchingUserProfile: false,
				error: action.error
			});
		default:
			return state;
	}
}