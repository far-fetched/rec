import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function examplesReducer(state = initialState.examples, action) {
	switch (action.type) {
		case types.LOAD_EXAMPLES_SUCCESS:
			return [...action.examples.map(example => {
								return example.content;
							})];
		default:
			return state;
	}
}