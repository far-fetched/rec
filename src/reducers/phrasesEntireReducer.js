import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function phrasesEntireReducer(state = initialState.entirePhrases, action) {
	switch(action.type) {
		case types.LOAD_PHRASES_SUCCESS:
			return [...action.phrases];
		default:
			return state;
	}
}
