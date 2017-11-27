import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import history from './history';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';

const reactRouterMiddleware = routerMiddleware(history);

export default createStore(
	reducers,
	composeWithDevTools(
		applyMiddleware(reactRouterMiddleware, reduxPromise, reduxThunk, logger)
	),
);