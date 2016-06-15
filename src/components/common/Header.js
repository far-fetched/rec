import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CircularProgress from 'material-ui/CircularProgress';

const Header = ({loading}) => {
	return (
		<AppBar title="Words Web" style={{display: '-webkit-flex'}}  
					iconElementLeft={
						<IconMenu
							iconButtonElement={
								<IconButton><MoreVertIcon /></IconButton>
							}
							targetOrigin={{horizontal: 'left', vertical: 'top'}}
							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						>
							<MenuItem primaryText="Login" containerElement={<Link to="/" />} />
							<MenuItem primaryText="Lessons" containerElement={<Link to="/lessons" />} />
							<MenuItem primaryText="Words" />
						</IconMenu>
					} children={loading && <CircularProgress color="white" />} />
	);
};

Header.propTypes = {
	loading: PropTypes.bool.isRequired 
};

export default Header;