import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lessonActions from '../../actions/lessonActions';
import LessonForm from './LessonForm';
import toastr from 'toastr';

class LessonsPageManage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			lesson: Object.assign({}, this.props.lesson),
			errors: {},
			saving: false
		};

		this.updateLessonState = this.updateLessonState.bind(this);
		this.saveLesson = this.saveLesson.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.lesson.id != nextProps.lesson.id) {
			this.setState({lesson: Object.assign({}, nextProps.lesson)});
		}     
	}

	updateLessonState(event) {
		const field = event.target.name;
		let lesson = this.state.lesson;
		lesson[field] = event.target.value;
		return this.setState({lesson: lesson});
	}

	saveLesson(event) {
		event.preventDefault();
		this.setState({saving: true});
		this.props.actions.saveLesson(this.state.lesson)
			.then(() => this.redirect())
			.catch(error => {
				toastr.error(error);
				this.setState({saving: false});		
			});
			
	}

	redirect() {
		this.setState({saving: false});		
		toastr.success('Lesson saved');
		this.context.router.push('/lessons');
	}

	render() {
		return (
				<LessonForm 
					lesson={this.state.lesson} 
					errors={this.state.errors}
					allAuthors={this.props.authors}
					onChange={this.updateLessonState}
					onSave={this.saveLesson}
					saving={this.state.saving}
				/>
		);
	}
}

LessonsPageManage.propTypes = {
	lesson: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

LessonsPageManage.contextTypes = {
	router: PropTypes.object
};

function getLessonById(courses, id) {
	const course = courses.filter(course => course.id == id);
	if (course.length) return course[0];
	return null;
}

function mapStateToProps(state, ownProps) {
	const lessonId = ownProps.params.id;

	let lesson = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

	if (lessonId && state.lessons.length > 0) {
		lesson = getLessonById(state.lessons, lessonId);
	}

	const authorsFormattedForDropdown = state.authors.map(author => {
		return {
			value: author.id,
			text: author.firstName + ' ' + author.lastName
		};
	});

	return {
		lesson: lesson,
		authors: authorsFormattedForDropdown
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(lessonActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonsPageManage);