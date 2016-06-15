
let empty = Object.assign({});

export default {
	authors: [],
	lessons: [],
	lesson: {
		pairs: []
	},
	ajaxCallsInProgress: 0,
	isAuthenticated: localStorage.getItem('token') ? true : false,
	languages: [],

	phrases: [],
	entirePhrases: [],

	entirePhraseUses: [],
	
	examples: [],
	entireExamples: [],

	objsToSend: Object.assign({}, {'firstToSend': Object.assign({}), 'secondToSend': Object.assign({})})

};