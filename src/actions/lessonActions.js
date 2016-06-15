import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

function parseJSON(res) {
	return res.json();
}

export function createLesson(lesson) {
	return { type: types.CREATE_LESSON, lesson};
}

export function addLesson(lesson) {
	return function(dispatch) {
		dispatch(beginAjaxCall());

		let config = {
			method: 'POST',
			headers: { 
				'Authorization': 'Bearer' + localStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: lesson.name,
				firstLanguage: lesson.firstLanguage,
				secondLanguage: lesson.secondLanguage
			})
		};

		return fetch('http://phraseweb-dziadzior.rhcloud.com/lists', config).then(parseJSON)
			.then(response => {
				console.log("response from server ", response);
				if (response.error) {
					throw response;
				}
				dispatch(addLessonSuccess(response));

			}).catch(err => {
				console.log("obsulga bledu w lesson action", err);
				dispatch(ajaxCallError());
				throw err;
			});
	};
}

export function loadLessons() {
	return function(dispatch) {
		dispatch(beginAjaxCall());

		let config = {
			method: 'GET',
			headers: { 
				'Authorization': 'Bearer' + localStorage.getItem('token')
			}
		};

		return fetch('http://phraseweb-dziadzior.rhcloud.com/lists', config).then(parseJSON)
			.then(response => {
				console.log("response from server ", response);
				if (response.error) {
					throw response;
				}
				dispatch(loadLessonsSuccess(response));

			}).catch(err => {
				console.log("obsulga bledu w lesson action");
				dispatch(ajaxCallError());
			});
	};
}

export function loadLesson(id) {
	return function(dispatch) {
		dispatch(beginAjaxCall());

		let config = {
			method: 'GET',
			headers: { 
				'Authorization': 'Bearer' + localStorage.getItem('token')
			}
		};

		return fetch('http://phraseweb-dziadzior.rhcloud.com/lists/' + id, config).then(parseJSON)
			.then(response => {
				console.log("response from server ", response);
				if (response.error) {
					throw response;
				}
				dispatch(loadLessonSuccess(response));

			}).catch(err => {
				console.log("obsulga bledu w lesson action");
				dispatch(ajaxCallError());
			});
	};
}

export function saveLesson(lesson) {
	return function (dispatch, getState) {
		dispatch(beginAjaxCall());
		return courseApi.saveCourse(lesson)
		.then(savedLesson => {
			lesson.id ? dispatch(updateLessonSuccess(savedLesson)) :
			dispatch(createLessonSuccess(savedLesson));
		}).catch(error => {
			dispatch(ajaxCallError(error));
			throw(error);
		});
	};
}

function addLessonSuccess(lesson) {
	return {type: types.ADD_LESSON_SUCCESS, lesson};
}

export function loadLessonSuccess(lesson) {
	return {type: types.LOAD_LESSON_SUCCESS, lesson};
}

export function createLessonSuccess(lesson) {
	return {type: types.CREATE_LESSON_SUCCESS, lesson};
}

export function updateLessonSuccess(lesson) {
	return {type: types.UPDATE_LESSON_SUCCESS, lesson};
}

export function loadLessonsSuccess(lessons) {
	return {type: types.LOAD_LESSONS_SUCCESS, lessons};
}
