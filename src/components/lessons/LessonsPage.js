import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lessonActions from '../../actions/lessonActions';
import LessonsList from './LessonsList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class LessonsPage extends React.Component {
	
	constructor(props, context) {
		super(props, context);

		this.redirectToAddLessonPage = this.redirectToAddLessonPage.bind(this);
	}

	componentWillMount() {
		if (!this.props.isAuthenticated) {
			toastr.error("Token expired");
			browserHistory.push('/');
		}
	}

	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.actions.loadLessons();
		}
	}

	redirectToAddLessonPage() {
		browserHistory.push('/lesson');
	}

    render() {
		const {lessons} = this.props;
        
        return (
			<LessonsList lessons={lessons} />
		);
    }
}

LessonsPage.propTypes = {
	lessons: PropTypes.array.isRequired,  
	actions: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		lessons: state.lessons,
		isAuthenticated: state.isAuthenticated
	};	
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(lessonActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonsPage);
