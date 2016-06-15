import React, {PropTypes} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FlipCard from './FlipCard';

const LessonDetail = ({lesson}) => {
	return (
		<div>
			{lesson.pairs.map(pair => {

				const valueOne = {
					front: pair.phraseOne.value,
					back: pair.phraseOne.example
				};

				const valueTwo = {
					front: pair.phraseTwo.value,
					back: pair.phraseTwo.example
				};

				return (
					<div key={pair.id} className="row-container">
						<FlipCard value={valueOne} />
						<FlipCard value={valueTwo} />
					</div>
				);
			})}
		</div>		
	);
};

LessonDetail.propTypes = {
	lesson: PropTypes.object.isRequired
};

export default LessonDetail;