import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import history from './history';
import reducers from './reducers';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

const reactRouterMiddleware = routerMiddleware(history);

export default createStore(
	reducers,
	composeWithDevTools(
		applyMiddleware(reactRouterMiddleware, reduxPromise, reduxThunk)
	),
);