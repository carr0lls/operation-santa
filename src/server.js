import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import request from 'superagent';
import React from 'react';
import { renderToString } from 'react-dom/server';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Html } from './helpers';
import { Constants } from './constants';
import favicon from 'serve-favicon';
import Routes from './routes';
import store from './store';

const api = {
    url: Constants.API_FETCH_URL,
    pollInterval: Constants.API_REFRESH_INTERVAL
};
const app = express();

app.set('port', 4000);
app.use(compression());
app.use(express.static(path.join(__dirname, '../public'), {index: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

// Universal rendering by matching routes to react-router components
app.get('*', (req, res) => {
/*	if (err) {
		res.status(500).send(err.message);
	} 
	else if (redirect) {
		res.redirect(redirect.pathname + redirect.search);
	} 
	else if (renderProps) {
		const component = (
        	<Provider store={store} key="provider">
        		<RouterContext {...renderProps}/>
        	</Provider>
        );*/

	const context = {};

/*	const component = (
			<Provider store={store} key="provider">
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<StaticRouter location={req.url} context={context}>
						<Routes />
					</StaticRouter>
				</MuiThemeProvider>
			</Provider>
		);*/

	const component = (
			<Provider store={store} key="provider">
				<StaticRouter location={req.url} context={context}>
					<Routes />
				</StaticRouter>
			</Provider>
		);

		res.send('<!DOCTYPE html>\n' + 
			renderToString(<Html component={component} store={store} />));
/*	} 
	else {
		res.status(404).send('<h1>404 Not Found</h1>');
	}*/
});

app.listen(app.get('port'), () => {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});
