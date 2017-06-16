import { loadState } from '../localStorage';

const initState = Object.assign({}, loadState());

export default (state = {}, action) => {
	
	switch(action.type) {
		default:
			return state;
	}
}