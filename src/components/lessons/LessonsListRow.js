import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const LessonsListRow = ({lesson}) => {
	return (
		<tr>
			<td><a href={lesson.watchHref} target="_blank">Watch</a></td>
			<td><Link to={'/lesson/' + lesson.id}>{lesson.title}</Link></td>
			<td>{lesson.authorId}</td>
			<td>{lesson.category}</td>
			<td>{lesson.length}</td>
		</tr>
	);
};

LessonsListRow.propTypes = {
	lesson: PropTypes.object.isRequired
};

export default LessonsListRow;