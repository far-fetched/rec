import React, {PropTypes} from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const LoginForm = ({onChange, onLog, requesting}) => {
  return (
    <Card style={{marginTop: '20px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto', width: '300px'}}>
    <CardText>
      <TextField
        floatingLabelText="Login" onChange={onChange} name="login"
      /><br />
      <TextField
        floatingLabelText="Password"
        type="password"
        name="password"
        onChange={onChange}
      /><br />
    </CardText>
    <CardActions>
      <FlatButton label="Sign in" onClick={onLog} disabled={requesting} />
    </CardActions>
  </Card>   
  );
};

LoginForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onLog: PropTypes.func.isRequired,
  requesting: PropTypes.bool
};

export default LoginForm;