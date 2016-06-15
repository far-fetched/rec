import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lessonActions from '../../actions/lessonActions';
import * as languageActions from '../../actions/languageActions';
import * as examplesActions from '../../actions/examplesActions';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

class NewExampleDialog extends React.Component {
	
	constructor(props, context) {
		super(props, context);

		this.state = {
			open: false,
			my: null
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleUpdateInput = this.handleUpdateInput.bind(this);
	}

	handleOpen() {
		this.setState({open: true});
	}

	handleClose() {
		this.setState({open: false});
	}

	handleSave() {
		this.handleClose();
		console.log(this.props);
	}

	handleUpdateInput(value) {
		clearTimeout(this.state.myTime);

		let temp = setTimeout(() => {
			if (value) {
				this.props.actions.loadExamples(value, this.props.lesson.firstLanguage.id)
					.then(() => {
						console.log(this.props);
					});
			}
		}, 500);
		this.setState({myTime: temp});
	
	}

	render() {
		return (
			<div>
				<FlatButton label="Add New Example" onTouchTap={this.handleOpen} />
				<Dialog
					title="Add New Example"
					actions={<FlatButton label="Ok" onTouchTap={this.handleSave} />}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
				<TextField
					floatingLabelText="example" name={this.props.name} onChange={this.props.onChange}
				/><br />
				<AutoComplete
							hintText="Type example"
							dataSource={this.props.examples}
							onUpdateInput={this.handleUpdateInput}
							fullWidth={true}
						/><br />
				</Dialog>
			</div>
		);
	}

}

NewExampleDialog.propTypes = {
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	examples: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
	lesson: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		examples: state.examples
	};	
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(examplesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NewExampleDialog);
