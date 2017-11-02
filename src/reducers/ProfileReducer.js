const initialState = { 
	user: {},
	isFetchingUserProfile: false,
	delivery: {},
	isFetchingDeliveryEstimate: false,
	isCreatingDelivery: false,
	modal: { step: 1, form: {} },
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_USER_PROFILE_REQUEST':
			return Object.assign({}, state, {
				isFetchingUserProfile: true
			});
		case 'FETCH_USER_PROFILE_SUCCESS':
			return Object.assign({}, state, {
				user: action.response,
				isFetchingUserProfile: false
			});
		case 'FETCH_USER_PROFILE_FAIL':
			return Object.assign({}, state, {
				user: {
					error: action.error
				},
				isFetchingUserProfile: false
			});
		case 'SET_MODAL_STEP':
			return Object.assign({}, state, {
				modal: { 
					...state.modal,
					step: action.data 
				}
			});
		case 'FETCH_POSTMATES_ESTIMATE_REQUEST':
			return Object.assign({}, state, {
				isFetchingDeliveryEstimate: true
			});
		case 'FETCH_POSTMATES_ESTIMATE_SUCCESS':
			return Object.assign({}, state, {
				delivery: {
					...state.delivery,
					estimate: action.response,
					error: null
				},
				isFetchingDeliveryEstimate: false
			});
		case 'FETCH_POSTMATES_ESTIMATE_FAIL':
			return Object.assign({}, state, {
				delivery: {
					error: action.error					
				},
				isFetchingDeliveryEstimate: false
			});
		case 'CREATE_POSTMATES_DELIVERY_REQUEST':
			return Object.assign({}, state, {
				isCreatingDelivery: true
			});
		case 'CREATE_POSTMATES_DELIVERY_SUCCESS':
			return Object.assign({}, state, {
				delivery: {
					...state.delivery,
					status: action.response,
					error: null
				},
				isCreatingDelivery: false
			});
		case 'CREATE_POSTMATES_DELIVERY_FAIL':
			return Object.assign({}, state, {
				delivery: {
					error: action.error					
				},
				isCreatingDelivery: false
			});
		case 'UPDATE_DELIVERY_MODAL_FORM':
			return Object.assign({}, state, {
				modal: {
					...state.modal,
					form: action.data
				}
			});
		default:
			return state;
	}
};