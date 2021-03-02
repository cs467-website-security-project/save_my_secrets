import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from 'prop-types';
import axios from 'axios';
import SetSecurityLevel from './SetSecurityLevel';
import Register from './Register';

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

const SignIn = (props) => {
  const classes = useStyles();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [recaptchaDisabled, setRecaptchaEnabled] = useState(true);
  const [blockAttempt, setBlockAttempt] = useState(true);
  const {
    onAuthChange,
    setUserId,
    setUsername,
    signInAttempt,
    setLimitAttempts,
    limitAttempts,
  } = props;

  const onRecap = (val) => {
    if (val) setRecaptchaEnabled(false);
  };

  const decrementAttempts = () => {
    if (limitAttempts <= 1) {
      setLimitAttempts(limitAttempts - 1);
      setBlockAttempt(false);
      setRecaptchaEnabled(true);
      return;
    }
    setLimitAttempts(limitAttempts - 1);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    const loginCreds = new URLSearchParams();
    loginCreds.append('username', username.value);
    loginCreds.append('password', password.value);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVICE}/login`, loginCreds, config)
      .then((res) => {
        if (res.status === 200) {
          console.log('Login SUCCESS');
          onAuthChange(true);
          setUserId(res.data);
          setUsername(username.value);
          setShowSignInForm(false);
          setShowRegisterForm(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log('Invalid credentials');
          signInAttempt(true);
        } else {
          console.log('Issue with Authentication server');
          signInAttempt(true);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.buttons}>
      {showSignInForm && (
        <>
          <div className={classes.paper}>
            <SetSecurityLevel />
            <form className={classes.form} noValidate onSubmit={handleLogin}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <br />
              <br />
              <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} onChange={onRecap} />
              <br />
              <ButtonGroup variant="contained" color="primary" className={classes.buttons}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={recaptchaDisabled}
                  onClick={decrementAttempts}
                >
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowRegisterForm(true)}
                  disabled={recaptchaDisabled && blockAttempt}
                >
                  Register
                </Button>
              </ButtonGroup>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <br />
          <br />
        </>
      )}
      {showRegisterForm && <Register />}
    </Container>
  );
};

SignIn.propTypes = {
  onAuthChange: PropTypes.func.isRequired,
  signInAttempt: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setLimitAttempts: PropTypes.func.isRequired,
  limitAttempts: PropTypes.number.isRequired,
};

export default SignIn;
