import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as authActions from '../../actions/authActions';
import LoginForm from './LoginForm';
import toastr from 'toastr';
toastr.options.positionClass = 'toast-bottom-left';

class LoginPage extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			credentials: Object.assign({}),
			requesting: false
		};

		this.updateLoginState = this.updateLoginState.bind(this);
		this.login = this.login.bind(this);
	}

	updateLoginState(event) {
		const field = event.target.name;
		let credentials = this.state.credentials;
		credentials[field] = event.target.value;
		return this.setState({credentials: credentials});
	}

	login(event) {
		event.preventDefault();
		this.setState({requesting: true});
		this.props.actions.loginUser(this.state.credentials)
			.then(() => {
				this.setState({requesting: false});
				toastr.success('Login Success');
				browserHistory.push('/lessons');
			}).catch((err) => {
				this.setState({requesting: false});
				toastr.error(err.error);
			});
	}

    render() {
        return (
			<LoginForm onChange={this.updateLoginState} onLog={this.login} requesting={this.state.requesting} />
        );
    }
}

LoginPage.propTypes = {
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		state
	};	
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
