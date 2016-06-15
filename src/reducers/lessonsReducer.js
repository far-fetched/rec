import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function lessonsReducer(state = initialState.lessons, action) {
	switch(action.type) {
		case types.CREATE_LESSON:
			return [...state,
				Object.assign({}, action.lesson)
			];

		case types.LOAD_LESSONS_SUCCESS:
			return action.lessons;

		case types.CREATE_LESSON_SUCCESS:
			return [...state, Object.assign({}, action.lesson)];

		case types.UPDATE_LESSON_SUCCESS:
			return [
				...state.filter(lesson => lesson.id !== action.lesson.id),
				Object.assign({}, action.lesson)
			];
		case types.ADD_LESSON_SUCCESS: 
			return ([...state, Object.assign({}, action.lesson)]);
		default:
			return state;
	}
}