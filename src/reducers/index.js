import {combineReducers} from 'redux';
import lessons from './lessonsReducer';
import lesson from './lessonReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import auth from './authReducer';
import languages from './languagesReducer';
import phrases from './phrasesReducer';
import phrasesEntireReducer from './phrasesEntireReducer';
import phraseUsesEntireReducer from './phraseUsesEntireReducer';
import examples from './examplesReducer';
import examplesEntire from './examplesEntireReducer';

const rootReducer = combineReducers({
	lessons,
	authors,
	ajaxCallsInProgress,
	isAuthenticated: auth,
	lesson,
	languages,
	phrases,
	entirePhrases: phrasesEntireReducer,
	entirePhraseUses: phraseUsesEntireReducer,
	examples,
	entireExamples: examplesEntire
});

export default rootReducer;