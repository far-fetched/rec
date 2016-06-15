import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function phraseUsesEntireReducer(state = initialState.entirePhraseUses, action) {
	switch(action.type) {
		case types.LOAD_PHRASE_USES_SUCCESS:
			return [...action.phrases];
		default:
			return state;
	}
}


