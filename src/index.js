import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


// import store from 'store.js'

//if(localStorage.getItem("c2c-token")) axios.defaults.headers['x-auth-token'] = localStorage.getItem("c2c-token");

/* axios.interceptors.response.use( (response=>response), function (error) {
  if ( 401 === error.response.status ) {
    window.location = '/login';
    // store.dispatch({type:'a/logout'});
  } else { return Promise.reject(error) }
});
 */
ReactDOM.render(
  // <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
