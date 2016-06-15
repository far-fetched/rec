import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lessonActions from '../../actions/lessonActions';
import * as languageActions from '../../actions/languageActions';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class LessonAddDialog extends React.Component {
	
	constructor(props, context) {
		super(props, context);

		this.state = {
			open: false,
			firstLanguage: {
				id: "init",
				name: ""
			},
			secondLanguage: {
				id: "init",
				name: ""
			},
			name: ""
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleChangeDropFirst = this.handleChangeDropFirst.bind(this);
		this.handleChangeDropSecond = this.handleChangeDropSecond.bind(this);
		this.updateLessonState = this.updateLessonState.bind(this);
	}

	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.actions.loadLanguages();
		}
	}

	handleOpen() {
		this.setState({open: true});
	}

	handleClose() {
		this.setState({open: false});
	}

	handleSave() {
		let lesson = Object.assign({}, {
			"firstLanguage": this.state.firstLanguage, 
			"secondLanguage": this.state.secondLanguage, 
			"name": this.state.name
		});
		this.props.actions.addLesson(lesson)
			.then(() => {
				toastr.success('Added new List');
			}).catch((err) => {
				toastr.error('Something goes wrong, try again');
			});
		this.setState({firstLanguage: {id: "init"}});
		this.setState({secondLanguage: {id: "init"}});
		this.handleClose();
	}

	getLanguageNameById(languages, id) {
		const language = languages.filter(language => language.id == id);
		if (language.length) return language[0].name;
		return null;
	}

	updateLessonState(event) {
		let lessonName = event.target.value;
		return this.setState({name: lessonName});
	}

	handleChangeDropFirst(event, index, value) {
		let name = this.getLanguageNameById(this.props.languages, value);
		let firstLanguage = {
			"name": name,
			"id": value
		};
		this.setState({firstLanguage: firstLanguage});
	}

	handleChangeDropSecond(event, index, value) {
		let name = this.getLanguageNameById(this.props.languages, value);
		let secondLanguage = {
			"name": name,
			"id": value
		};
		this.setState({secondLanguage: secondLanguage});
	}

	render() {
		return (
			<div>
				<FlatButton label="Add New List" onTouchTap={this.handleOpen} />
				<Dialog
					title="Add new list"
					actions={<FlatButton label="Ok" onTouchTap={this.handleSave} />}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
				<TextField
					floatingLabelText="Name" name="name" onChange={this.updateLessonState}
				/><br />
				<SelectField value={this.state.firstLanguage.id} style={{marginRight: '15px'}} onChange={this.handleChangeDropFirst}>
					<MenuItem value="init" primaryText="Choose First Language" />
					{this.props.languages.map(language => {
						return <MenuItem key={language.id} value={language.id} primaryText={language.name} />;
					})}
				</SelectField>
				<SelectField value={this.state.secondLanguage.id} onChange={this.handleChangeDropSecond}>
					<MenuItem value="init" primaryText="Choose Second Language" />
					{this.props.languages.map(language => {
						return <MenuItem key={language.id} value={language.id} primaryText={language.name} />;
					})}
				</SelectField>
				</Dialog>
			</div>
		);
	}
}

LessonAddDialog.propTypes = {
	languages: PropTypes.array.isRequired,  
	actions: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		languages: state.languages,
		isAuthenticated: state.isAuthenticated
	};	
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, lessonActions, languageActions), dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonAddDialog);