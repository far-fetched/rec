import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lessonActions from '../../actions/lessonActions';
import * as languageActions from '../../actions/languageActions';
import * as phraseActions from '../../actions/phraseActions';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import _ from 'lodash';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import NewExampleDialog from './NewExampleDialog';

class PhraseAddDialog extends React.Component {
	
	constructor(props, context) {
		super(props, context);

		this.state = {
			open: false,
			dataSource: [
				"zamek",
				"zam",
				"Add new phrase"
			],
			myTime: null,
			firstPhraseUseTosend: Object.assign({})
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleUpdateInput = this.handleUpdateInput.bind(this);
		this.onNewRequest = this.onNewRequest.bind(this);
		this.updateExample = this.updateExample.bind(this);
		//this.handleChoose = this.handleChoose.bind(this);
	}

	componentDidMount() {
		//if (this.props.isAuthenticated) {
			
		//}
	}

	handleOpen() {
		this.setState({open: true});
	}

	handleClose(event) {
		this.setState({open: false});
		console.log(event.currentTarget);
	}

	onNewRequest(value) {
		
		if (value.substring(0, 14)==="Add new phrase") {
			console.log("nowy");
		} else {
			let obj = _.find(this.props.entirePhrases, (phrase) => {
				return phrase.content === value;
			});
			this.props.actions.loadPhraseUses(obj.id, this.props.lesson.firstLanguage.id)
				.then(() => console.log(this.props));
		}

	}

	handleUpdateInput(value) {

		this.props.actions.addLastValue(value);

		clearTimeout(this.state.myTime);

		let temp = setTimeout(() => {
			if (value) {
				this.props.actions.loadPhrases(value, this.props.lesson.firstLanguage.id)
					.then(() => {
						this.props.actions.addLastValue(value);
						console.log(this.props);
					});
			}
		}, 500);
		this.setState({myTime: temp});
	}

	handleChoose(id) {
		let obj = _.find(this.props.entirePhraseUses, (phraseUse) => {
				return phraseUse.id === id;
			});

		console.log(obj);
		this.setState({firstPhraseUseTosend: Object.assign({}, obj)});
		toastr.info('You have chosen ' + obj.phrase.content);
		setTimeout(() => {
			console.log(this.state);
		}, 1000);
	}

	updateExample(event) {
		console.log(event.target.value);
		console.log(event.target.name);
	}

	render() {
		return (
			<div>
				<Card style={{marginTop: '20px'}}>
					<CardTitle title="Words" />
					<CardText>
				<List>
					{this.props.entirePhraseUses.map(phraseUse => <ListItem 
														key={phraseUse.id} 
														primaryText={phraseUse.examples[0].content}
														onClick={this.handleChoose.bind(this, phraseUse.id)}/>)}
				</List>
				<AutoComplete
							hintText="Type phrase"
							dataSource={this.props.phrases}
							onUpdateInput={this.handleUpdateInput}
							onNewRequest={this.onNewRequest}
						/><br />
				<NewExampleDialog lesson={this.props.lesson} name="newExampleOne" onChange={this.updateExample}/>
					</CardText>

					<CardActions>
						
					</CardActions>
				</Card>	
				
			</div>
		);
	}
}

PhraseAddDialog.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired,
	phrases: PropTypes.array.isRequired,
	entirePhrases: PropTypes.array.isRequired,
	entirePhraseUses: PropTypes.array.isRequired,
	lesson: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {

	return {
		isAuthenticated: state.isAuthenticated,
		phrases: state.phrases,
		entirePhrases: state.entirePhrases,
		entirePhraseUses: state.entirePhraseUses,
		lesson: state.lesson
	};	
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(phraseActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PhraseAddDialog);