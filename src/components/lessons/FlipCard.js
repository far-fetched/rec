import React, {PropTypes} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import classNames from 'classnames';

class FlipCard extends React.Component {
	
	constructor(props, context) {
		super(props, context);

		this.state = {
			flipped: false
		};

		this.flip = this.flip.bind(this);
	}

	flip(event) {
		this.setState({flipped: !this.state.flipped});
	}

	render() {

		let flipClass = classNames({
			'flipped': this.state.flipped
		});

		return (
			<div className="flippy" onClick={this.flip}>
				<div className={flipClass + ' flippy-front'}>
					{this.props.value.front}	
				</div>
				
				<div className={flipClass + ' flippy-back'}>
					{this.props.value.back}
				</div>
			</div>
		);
	}
}

FlipCard.propTypes = {
	value: PropTypes.object.isRequired
};

export default FlipCard;