import * as types from './actionTypes';
import 'whatwg-fetch';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

function loadExamplesSuccess(examples) {
  return {
    type: types.LOAD_EXAMPLES_SUCCESS,
    examples
  };
}

export function loadExamples(value, languageId) {
  
  let config = {
    method: 'GET',
    headers: { 
      'Authorization': 'Bearer' + localStorage.getItem('token')
    }
  };

  return function(dispatch) {

    dispatch(beginAjaxCall());
    return fetch('http://phraseweb-dziadzior.rhcloud.com/examples?example=' + value + '&languageId=' + languageId, config).then(parseJSON)
		.then(response => {
			console.log("response from server ", response);
			if (response.error) {
				throw response;
			}
			localStorage.setItem('token', response.access_token);
			dispatch(loadExamplesSuccess(response));

		}).catch(err => {
			console.log("obsulga bledu w examples action");
			dispatch(ajaxCallError());
			throw err;
			
		});
  };
}

function parseJSON(res) {
	return res.json();
}