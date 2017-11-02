import { Constants } from './constants';

export const loadState = () => {
	try {
		const persistedState = localStorage.getItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE);
		if (persistedState === null)
			return undefined;

		return { persisted: JSON.parse(persistedState) };
	}
	catch (e) {
		return undefined;
	}
};

export const saveState = ({ persisted }) => {
	try {
		if (persisted) {
			const serializedToken = JSON.stringify({ t: persisted.t });
			localStorage.setItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE, serializedToken);
		}
		else {
			localStorage.removeItem(Constants.LOCAL_STORAGE_PROFILE_COOKIE);
		}
	}
	catch (e) {

	}
};
