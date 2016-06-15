import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import mui from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {

	constructor(context, props) {
		super(context, props);
	}

	getChildContext() {
		return {muiTheme: getMuiTheme(baseTheme)};
	}	

	render() {
		return (
			<div>
				<Header loading={this.props.loading} />
				{this.props.children}
			</div>
		);
	}
}

App.childContextTypes = {
	muiTheme: PropTypes.object.isRequired
};

App.propTypes = {
	children: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		loading: state.ajaxCallsInProgress > 0
	};
}

export default connect(mapStateToProps)(App);