import * as types from './actionTypes';
import 'whatwg-fetch';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

function requestLogin() {
  return {
    type: types.LOGIN_REQUEST,
    isAuthenticated: false
  };
}

function receiveLogin() {
  return {
    type: types.LOGIN_SUCCESS,
    isAuthenticated: true
  };
}

function loginError() {
  return {
    type: types.LOGIN_ERROR,
    isAuthenticated: false
  };
}

export function loginUser(creds) {
  
  let config = {
    method: 'POST',
    headers: { 
		'Content-Type':'application/x-www-form-urlencoded',
		'Authorization': 'Basic d3dlYmFuZHJvaWQ6d3dlYmFuZHJvaWRzZWNyZXQ='
	},
    body: `username=${creds.login}&password=${creds.password}&grant_type=password`
  };
  
  return function(dispatch) {
    dispatch(requestLogin());
    dispatch(beginAjaxCall());
    return fetch('http://auth-dziadzior.rhcloud.com/oauth/token', config).then(parseJSON)
		.then(response => {
			console.log("response from server ", response);
			if (response.error) {
				throw response;
			}
			localStorage.setItem('token', response.access_token);
			dispatch(receiveLogin());

		}).catch(err => {
			console.log("obsulga bledu w auth action");
			dispatch(ajaxCallError());
			dispatch(loginError(err));
			throw err;
			
		});
  };
}

function parseJSON(res) {
	return res.json();
}