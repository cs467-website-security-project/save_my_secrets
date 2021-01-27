import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const SigninFail = (props) => {
  const classes = useStyles();
  const { auth, signInAttempt } = props;
  if (auth === false && signInAttempt)
    return (
      <Container component="main" maxWidth="xs" className={classes.buttons}>
        <span style={{ color: 'red' }}>Signin Failed</span>
      </Container>
    );
  return null;
};

SigninFail.propTypes = {
  auth: PropTypes.bool.isRequired,
  signInAttempt: PropTypes.bool.isRequired,
};

export default SigninFail;
