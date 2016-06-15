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
	entireExamples: []
};