import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function examplesEntireReducer(state = initialState.entireExamples, action) {
	switch (action.type) {
		case types.LOAD_EXAMPLES_SUCCESS:
			return [...action.examples];
		default:
			return state;
	}
}