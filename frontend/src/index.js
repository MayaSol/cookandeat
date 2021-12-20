import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

axios.interceptors.request.use(request => {
	console.log(request);
	// Edit request config
	return request;
}, error => {
	console.log('axios.interceptors.request');
	console.log(error);
	return Promise.reject(error);
})

axios.interceptors.response.use(response => {
  console.log(response);
  // Edit request config
  return response;
}, error => {
	console.log('axios.interceptors.response');
	console.log(error);
	return Promise.reject(error);
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
