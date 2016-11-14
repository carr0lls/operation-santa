import express from 'express'
import path from 'path'
import compression from 'compression'
import bodyParser from 'body-parser'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Constants } from './constants'
import routes from './routes'

const app = express()

app.set('port', 4000)
app.use(compression())
app.use(express.static(path.join(__dirname, '../public'), {index: false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
	match({ routes, location: req.url }, (err, redirect, props) => {
		if (err) {
		  res.status(500).send(err.message)
		} 
		else if (redirect) {
		  res.redirect(redirect.pathname + redirect.search)
		} 
		else if (props) {
		  const appHtml = renderToString(<RouterContext {...props}/>)
		  res.send(renderPage(appHtml))
		} 
		else {
		  res.status(404).send('<h1>404 Not Found</h1>')
		}
	})
})

function renderPage(appHtml) {
  return `
    <!DOCTYPE html>
	<html lang="en">
      <head>
        <meta charSet="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    	<meta http-equiv="x-ua-compatible" content="ie=edge"/>
        <link href="http://fonts.googleapis.com/css?family=Raleway:400" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css" integrity="sha384-AysaV+vQoT3kOAXZkl02PThvDr8HYKPZhNT5h/CXfBThSRXQ6jW5DO2ekP5ViFdi" crossorigin="anonymous" />
        <link href="css/styles.css" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div id="content">${appHtml}</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" integrity="sha384-3ceskX3iaEnIogmQchP8opvBy3Mi7Ce34nWjpBIwVTHfGYWQS9jwHDVRnpKKHJg7" crossorigin="anonymous"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.3.7/js/tether.min.js" integrity="sha384-XTs3FgkjiBgo8qjEjBk0tGmf3wPrWtA6coPfQDfFEY8AnYJwjalXCiosYRBIBZX8" crossorigin="anonymous"></script>
    	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/js/bootstrap.min.js" integrity="sha384-BLiI7JTZm+JWlgKa0M0kGRpJbF2J8q+qreVrKBC47e3K6BW78kGLrCkeRX6I9RoK" crossorigin="anonymous"></script>
        <script type="text/javascript" src="scripts/app.js"></script>
      </body>
    </html>
   `
}

app.listen(app.get('port'), () => {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})
