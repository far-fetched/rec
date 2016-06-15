import React, {PropTypes} from 'react';
import LessonsListRow from './LessonsListRow';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';
import LessonAddDialog from './LessonAddDialog';

const LessonsList = ({lessons}) => {
	return (

		<Card style={{marginTop: '20px'}}>
			<CardTitle title="Lessons" />
			<CardText>
				<List>
					{lessons.map(lesson => <ListItem 
	key={lesson.id} 
	primaryText={<div style={{marginLeft: '40px', backgroundOrigin: 'center'}}><Link name={lesson.id} to={'/lesson/' + lesson.id}>{lesson.name}</Link></div>}
	leftAvatar={<div><Avatar style={{marginLeft: '5px', background: 'url(https://s396295.students.wmi.amu.edu.pl/Flagi/flat64round/' + lesson.firstLanguage.flag + '.png) center'}} /> 
					<Avatar style={{marginLeft: '5px', background: 'url(https://s396295.students.wmi.amu.edu.pl/Flagi/flat64round/' + lesson.secondLanguage.flag + '.png) center'}} />
				</div>} 
					/>)}

				</List>
			</CardText>
			<CardActions>
				<LessonAddDialog />
			</CardActions>
		</Card>			
	);
};

LessonsList.propTypes = {
	lessons: PropTypes.array.isRequired
};

export default LessonsList;