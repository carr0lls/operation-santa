# Operation Santa
Give a warm surprise to families who are in need.

## Description
This web app is supports universal rendering via ReactJS, routing with React-Router, and Postmates' API to get delivery quotes and create deliveries for users. There is no flux implementation as this was meant to be a small project (MVP).

## Prerequisites
- [Operation Santa API](https://github.com/phchung/Operation_Santa)
- Alternative to API pre-req: Change API_FETCH_URL const inside src/constants/Constants.js to: 'https://operation-santa.herokuapp.com/api/'

## To run

```sh
npm install

# Transpile and bundle client, server, and test files
npm run build

# Start server
npm start
```

And visit <http://localhost:4000/> to access GUI.
