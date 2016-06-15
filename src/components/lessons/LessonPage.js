import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lessonActions from '../../actions/lessonActions';
import LessonDetail from './LessonDetail';
import PhraseAddDialog from './PhraseAddPage';
import RaisedButton from 'material-ui/RaisedButton';

class LessonPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleButton = this.handleButton.bind(this);
    }

	componentWillMount() {
		if (!this.props.isAuthenticated) {
			toastr.error("Token expired");
			browserHistory.push('/');
		}
	}

	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.actions.loadLesson(this.props.params.id);
		}
	}

	handleButton() {
		browserHistory.push('/words');
	}

    render() {
        return (
			<div>
				<div style={{width: '150px', marginLeft: 'auto', marginRight: 'auto'}}>
					<RaisedButton label="Add Words" onTouchTap={this.handleButton} />
				</div>
				<LessonDetail lesson={this.props.lesson} />
			</div>
		);
    }
}

LessonPage.propTypes = {
	actions: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	lesson: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		isAuthenticated: state.isAuthenticated,
		lesson: state.lesson
	};	
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(lessonActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonPage);
