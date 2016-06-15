import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.isAuthenticated, action) {
	switch(action.type) {
		case types.LOGIN_REQUEST:
			return action.isAuthenticated;
		case types.LOGIN_SUCCESS:
			return action.isAuthenticated;
		case types.LOGIN_ERROR:
			return action.isAuthenticated;
		default:
			return state;
	}
}
