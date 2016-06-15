import * as types from './actionTypes';
import 'whatwg-fetch';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

function parseJSON(res) {
	return res.json();
}

function loadPhrasesSuccess(phrases) {
	return { type: types.LOAD_PHRASES_SUCCESS, phrases};
}

function loadPhraseUsesSuccess(phrases) {
	return { type: types.LOAD_PHRASE_USES_SUCCESS, phrases};
}

export function addLastValue(value) {
	return { type: types.ADD_LAST_VALUE_SUCCESS, value};
}

export function loadPhraseUses(phraseId, languageId) {
	return function(dispatch) {
		dispatch(beginAjaxCall());

		let config = {
			method: 'GET',
			headers: { 
				'Authorization': 'Bearer' + localStorage.getItem('token')
			}
		};

		return fetch('http://phraseweb-dziadzior.rhcloud.com/phraseuses?phraseId=' + phraseId + '&languageId=' + languageId, config).then(parseJSON)
			.then(response => {
				console.log("response from server ", response);
				if (response.error) {
					throw response;
				}
				dispatch(loadPhraseUsesSuccess(response));

			}).catch(err => {
				console.log("obsulga bledu w phrase action", err);
				dispatch(ajaxCallError());
				throw err;
			});
	};
}

export function loadPhrases(phrase, languageId) {
	return function(dispatch) {
		dispatch(beginAjaxCall());

		let config = {
			method: 'GET',
			headers: { 
				'Authorization': 'Bearer' + localStorage.getItem('token')
			}
		};

		return fetch('http://phraseweb-dziadzior.rhcloud.com/phrases?phrase=' + phrase + '&languageId=' + languageId, config).then(parseJSON)
			.then(response => {
				console.log("response from server ", response);
				if (response.error) {
					throw response;
				}
				dispatch(loadPhrasesSuccess(response));

			}).catch(err => {
				console.log("obsulga bledu w phrase action", err);
				dispatch(ajaxCallError());
				throw err;
			});
	};
}
