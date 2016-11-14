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
		<html>
      <head>
        <meta charSet="utf-8" />
        <link href="http://fonts.googleapis.com/css?family=Raleway:100" rel="stylesheet" type="text/css" />
        <link href="css/styles.css" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div id="content">${appHtml}</div>
        <script type="text/javascript" src="scripts/app.js"></script>
      </body>
    </html>
   `
}

app.listen(app.get('port'), () => {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})
