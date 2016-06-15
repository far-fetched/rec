import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


function parseJSON(res) {
	return res.json();
}

function loadLanguagesSuccess(languages) {
	return { type: types.LOAD_LANGUAGES_SUCCESS, languages};
}

export function loadLanguages() {
	return function(dispatch) {
		dispatch(beginAjaxCall());

		let config = {
			method: 'GET',
			headers: { 
				'Authorization': 'Bearer' + localStorage.getItem('token')
			}
		};

		return fetch('http://phraseweb-dziadzior.rhcloud.com/languages', config).then(parseJSON)
			.then(response => {
				console.log("response from server ", response);
				if (response.error) {
					throw response;
				}
				dispatch(loadLanguagesSuccess(response));

			}).catch(err => {
				console.log("obsulga bledu w lesson action");
				dispatch(ajaxCallError());
			});
	};
}