import React from 'react'
import { RouterContext } from 'react-router'
import ContextWrapper from './ContextWrapper'

    export default class Html extends React.Component {
        
        render() {
            let stringData = 'var APP_STATE = ' + JSON.stringify(this.props.data) + ';';

            return (
                <html lang="en">
                    <head>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                        <meta http-equiv="x-ua-compatible" content="ie=edge"/>
                        <link href="http://fonts.googleapis.com/css?family=Raleway:400,100" rel="stylesheet" type="text/css" />
                        <link href="/css/bootstrap.min.css" rel="stylesheet" />
                        <link href="/css/animate.css" rel="stylesheet" type="text/css" />
                        <link href="/css/styles.css" rel="stylesheet" type="text/css" />
                    </head>
                    <body>
                        <div id="content">
                            <ContextWrapper data={this.props.data}>
                                <RouterContext {...this.props.renderProps}/>
                            </ContextWrapper>
                        </div>
                        <script dangerouslySetInnerHTML={{__html: stringData}}></script>
                        <script src="/scripts/jquery.min.js"></script>
                        <script src="/scripts/tether.min.js"></script>
                        <script src="/scripts/bootstrap.min.js"></script>
                        <script src="/scripts/app.js"></script>
                    </body>
                </html>
            )
        }
    }
