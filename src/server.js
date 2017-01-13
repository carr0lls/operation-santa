import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import request from 'superagent';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { Html } from './helpers';
import { Constants } from './constants';
import favicon from 'serve-favicon';
import routes from './routes';

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
	match({ routes, location: req.url }, (err, redirect, renderProps) => {
		if (err) {
			res.status(500).send(err.message);
		} 
		else if (redirect) {
			res.redirect(redirect.pathname + redirect.search);
		} 
		else if (renderProps) {
	        request
	        	.get(api.url + 'user?account_type=family')
	        	.end((err, result) => {
	        		if (err) {
	            		// user does not exist, move back to home page
						console.log('failed to retrieve users list', err);
	            	}
	            	else {
	            		const data = { users: result.body, api };
						res.send('<!DOCTYPE html>\n' + 
							renderToString(<Html renderProps={renderProps} data={data}/>));
	            	}
	        	});
		} 
		else {
			res.status(404).send('<h1>404 Not Found</h1>');
		}
	});
});

app.listen(app.get('port'), () => {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});
