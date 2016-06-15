import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function lessonReducer(state = initialState.lesson, action) {
	switch(action.type) {
		case types.LOAD_LESSON_SUCCESS: {

			const pairsFormatted = action.lesson.pairs.map(pair => {
				return {
					id: pair.id,
					phraseOne: {
						value: pair.phraseUseOne.phrase.content,
						example: pair.phraseUseOne.examples[0].content
					},
					phraseTwo: {
						value: pair.phraseUseTwo.phrase.content,
						example: pair.phraseUseTwo.examples[0].content
					}
				};
			});
			return Object.assign({}, {
				pairs: pairsFormatted, firstLanguage: {
						id: action.lesson.firstLanguage.id,
						name: action.lesson.firstLanguage.name
					},
					secondLanguage: {
						id: action.lesson.secondLanguage.id,
						name: action.lesson.secondLanguage.name
					}
			});
		}
 
		default:
			return state;
	}
}