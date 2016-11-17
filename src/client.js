import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { ContextWrapper } from './helpers'
import routes from './routes'

	render((
		<ContextWrapper data={window.APP_STATE}>
			<Router routes={routes} history={browserHistory}/>
		</ContextWrapper>
	), document.getElementById('content'))
