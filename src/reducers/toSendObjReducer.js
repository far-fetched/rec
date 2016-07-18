import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function toSendObjReducer(state = initialState.objsToSend, action) {
	switch(action.type) {
		case types.SET_OBJECT_TO_SEND: {

			let obj;
			if (action.propName == 'firstToSend') {
				obj = Object.assign({}, state, {'firstToSend': action.obj})
			} else {
				obj = Object.assign({}, state, {'secondToSend': action.obj})
			}
			
			return obj;
		}
		default:
			return state;
	}
}