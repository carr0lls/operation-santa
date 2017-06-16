import React from 'react';
import { render } from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './history';
// import { ContextWrapper } from './helpers';
import Routes from './routes';
import store from './store';
import { saveState } from './localStorage';

	store.subscribe(() => {
		saveState(store.getState().user);
	});

/*	render((
		<Provider store={store} key="provider">
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<ConnectedRouter history={history}>
					<Routes />
				</ConnectedRouter>
			</MuiThemeProvider>
    	</Provider>
	), document.getElementById('content'));*/

	render((
		<Provider store={store} key="provider">
			<ConnectedRouter history={history}>
				<Routes />
			</ConnectedRouter>
    	</Provider>
	), document.getElementById('content'));