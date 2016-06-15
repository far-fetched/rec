import * as types from '../actions/actionTypes';
import initialState from './initialState';

let last = "Add new phrase";

export default function phrasesReducer(state = initialState.phrases, action) {
	switch(action.type) {
		case types.LOAD_PHRASES_SUCCESS:
			return [...action.phrases.map(phrase => {
								return phrase.content;
							}), last];
		case types.ADD_LAST_VALUE_SUCCESS: {

			let temp = [...state];
			temp.pop();
			temp.push("Add new phrase " + action.value);
			return temp;
		}
		default:
			return state;
	}
}
