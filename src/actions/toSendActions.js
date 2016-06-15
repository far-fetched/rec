import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

function parseJSON(res) {
	return res.json();
}

export function setObj(obj, propName) {
	return {type: types.SET_OBJECT_TO_SEND, obj, propName};	
}

export function savePairSuccess(response) {
	return {type: types.SAVE_PAIR_SUCCESS, response};	
}

export function savePair(listId, first, second) {
	return function(dispatch) {
		dispatch(beginAjaxCall());

		let toSend = {
			phraseUseOne: first,
			phraseUseTwo: second
		}

		let config = {
			method: 'POST',
			headers: { 
				'Authorization': 'Bearer' + localStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(toSend)
		};

		return fetch('http://phraseweb-dziadzior.rhcloud.com/lists/' + listId + '/pairs', config).then(parseJSON)
			.then(response => {
				console.log("response from server ", response);
				if (response.error) {
					throw response;
				}
				dispatch(savePairSuccess(response));

			}).catch(err => {
				console.log("obsulga bledu w phrase action", err);
				dispatch(ajaxCallError());
				throw err;
			});
	};
}
