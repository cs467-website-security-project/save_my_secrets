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
  const { auth, signInAttempt, limitAttempts } = props;
  const limitSign = `You have ${limitAttempts} more attempts`;

  if (auth === false && signInAttempt)
    return (
      <Container component="main" maxWidth="xs" className={classes.buttons}>
        <span style={{ color: 'red' }}>Signin Failed</span>
        <br />
        {limitAttempts > 0 && <span style={{ color: 'red' }}>{limitSign}</span>}
        <br />
        {limitAttempts === 0 && <span style={{ color: 'red' }}>Please try again later</span>}
      </Container>
    );
  return null;
};

SigninFail.propTypes = {
  auth: PropTypes.bool.isRequired,
  signInAttempt: PropTypes.bool.isRequired,
  limitAttempts: PropTypes.number.isRequired,
};

export default SigninFail;
