import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import LessonsPage from './components/lessons/LessonsPage';
import LoginPage from './components/login/LoginPage';
import LessonPageManage from './components/lessons/LessonPageManage';
import LessonPage from './components/lessons/LessonPage';
import PhraseAddPage from './components/lessons/PhraseAddPage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={LoginPage} />
		<Route path="lessons" component={LessonsPage} />
		<Route path="lesson" component={LessonPageManage} />
		<Route path="lesson/:id" component={LessonPage} />
		<Route path="words" component={PhraseAddPage} />
	</Route>
);