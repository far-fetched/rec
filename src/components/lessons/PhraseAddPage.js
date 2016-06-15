import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lessonActions from '../../actions/lessonActions';
import * as languageActions from '../../actions/languageActions';
import * as phraseActions from '../../actions/phraseActions';
import * as toSendActions from '../../actions/toSendActions';
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
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {Tabs, Tab} from 'material-ui/Tabs';

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
			firstPhraseUseTosend: Object.assign({}),
			showChosenFirst: false,
			showMeaningFirst: false,
			showChosenSecond: false,
			showMeaningSecond: false,
			value: "12"
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleUpdateInput = this.handleUpdateInput.bind(this);
		this.onNewRequest = this.onNewRequest.bind(this);
		this.updateExample = this.updateExample.bind(this);
		this.onNewRequestSec = this.onNewRequestSec.bind(this);
		this.handleUpdateInputSec = this.handleUpdateInputSec.bind(this);
		this.savePair = this.savePair.bind(this);
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
				.then(() => this.setState({showMeaningFirst: true, showChosenFirst: false}));
		}

	}

	onNewRequest(value) {
		
		if (value.substring(0, 14)==="Add new phrase") {
			console.log("nowy");
		} else {
			let obj = _.find(this.props.entirePhrases, (phrase) => {
				return phrase.content === value;
			});
			this.props.actions.loadPhraseUses(obj.id, this.props.lesson.firstLanguage.id)
				.then(() => this.setState({showMeaningFirst: true, showChosenFirst: false}));
		}

	}

	onNewRequestSec(value) {
		
		if (value.substring(0, 14)==="Add new phrase") {
			console.log("nowy");
		} else {
			let obj = _.find(this.props.entirePhrases, (phrase) => {
				return phrase.content === value;
			});
			console.log("spr", obj.id, this.props.lesson.secondLanguage.id)
			this.props.actions.loadPhraseUses(obj.id, this.props.lesson.secondLanguage.id)
				.then(() => this.setState({showMeaningSecond: true, showChosenSecond: false}));
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

	handleUpdateInputSec(value) {

		this.props.actions.addLastValue(value);
		clearTimeout(this.state.myTime);

		let temp = setTimeout(() => {
			if (value) {
				this.props.actions.loadPhrases(value, this.props.lesson.secondLanguage.id)
					.then(() => {
						this.props.actions.addLastValue(value);
						console.log(this.props);
					});
			}
		}, 500);
		this.setState({myTime: temp});
	}

	handleChoose(id, property) {

		let obj = _.find(this.props.entirePhraseUses, (phraseUse) => {
				return phraseUse.id === id;
			});

		this.setState({firstPhraseUseTosend: Object.assign({}, obj)});
		this.props.actions.setObj(obj, property);
		toastr.info('You have chosen ' + obj.phrase.content);

		if (property=='firstToSend') {
			this.setState({showChosenFirst: true, showMeaningFirst: false});
		} else {
			this.setState({showChosenSecond: true, showMeaningSecond: false});
		}
		
		setTimeout(() => {
			console.log("po wybraniu: ", this.props);
		}, 1500);
	}

	updateExample(event) {
		console.log(event.target.value);
		console.log(event.target.name);
	}

	savePair() {
		this.props.actions.savePair(this.props.lesson.id, this.props.firstToSend, this.props.secondToSend);
	}

	render() {
		return (
			<div>
				<Tabs>
					<Tab label="First Word" >
					<Card style={{marginTop: '20px'}}>
					<CardTitle title="First Word" />
					<CardText>

						<AutoComplete
							hintText="Type phrase"
							dataSource={this.props.phrases}
							onUpdateInput={this.handleUpdateInput}
							onNewRequest={this.onNewRequest}
						/><br />
				{this.state.showMeaningFirst && <List>
					Which meaning ?
					{this.props.entirePhraseUses.map(phraseUse => <ListItem 
														key={phraseUse.id} 
														primaryText={phraseUse.examples[0].content}
														onClick={this.handleChoose.bind(this, phraseUse.id, 'firstToSend')}/>)}
					<NewExampleDialog lesson={this.props.lesson} name="newExampleOne" onChange={this.updateExample}/>
				</List>}

				
				{this.state.showChosenFirst && <div>{this.props.firstToSend.examples.map(example => {
					return <div key={example.id}>{example.content}</div>;
				})}

					<TextField
						floatingLabelText="Description"
      					floatingLabelFixed={true}
						value={this.props.firstToSend.phraseInfo.description}
					/><br />
					<Checkbox
						label="Idiom"
						defaultChecked={this.props.firstToSend.phraseInfo.isIdiom}
					/><br />
					<TextField
						floatingLabelText="Part of speech"
      					floatingLabelFixed={true}
						value={this.props.firstToSend.phraseInfo.partOfSpeach}
					/>
					</div>}

					</CardText>

					<CardActions>
						
					</CardActions>
					</Card>	
					</Tab>
					<Tab label="Second Word" >
					<Card style={{marginTop: '20px'}}>
					<CardTitle title="Second Word" />
					<CardText>

						<AutoComplete
							hintText="Type phrase"
							dataSource={this.props.phrases}
							onUpdateInput={this.handleUpdateInputSec}
							onNewRequest={this.onNewRequestSec}
						/><br />
				{this.state.showMeaningSecond && <List>
					Which meaning ?
					{this.props.entirePhraseUses.map(phraseUse => <ListItem 
														key={phraseUse.id} 
														primaryText={phraseUse.examples[0].content}
														onClick={this.handleChoose.bind(this, phraseUse.id, 'secondToSend')}/>)}
					<NewExampleDialog lesson={this.props.lesson} name="newExampleOne" onChange={this.updateExample}/>
				</List>}

				
				{this.state.showChosenSecond && <div>{this.props.secondToSend.examples.map(example => {
					return <div key={example.id}>{example.content}</div>;
				})}

					<TextField
						floatingLabelText="Description"
      					floatingLabelFixed={true}
						value={this.props.secondToSend.phraseInfo.description}
					/><br />
					<Checkbox
						label="Idiom"
						defaultChecked={this.props.secondToSend.phraseInfo.isIdiom}
					/><br />
					<TextField
						floatingLabelText="Part of speech"
      					floatingLabelFixed={true}
						value={this.props.secondToSend.phraseInfo.partOfSpeach}
					/>
					</div>}

					</CardText>

					<CardActions>
						
					</CardActions>
					</Card>	
					</Tab>					
				</Tabs>
					<Card>
					<CardActions>
						<FlatButton label="Add" onTouchTap={this.savePair} />
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
	lesson: PropTypes.object.isRequired,
	firstToSend: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {

	return {
		isAuthenticated: state.isAuthenticated,
		phrases: state.phrases,
		entirePhrases: state.entirePhrases,
		entirePhraseUses: state.entirePhraseUses,
		lesson: state.lesson,
		firstToSend: state.objsToSend.firstToSend,
		secondToSend: state.objsToSend.secondToSend
	};	
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, phraseActions, toSendActions), dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PhraseAddDialog);