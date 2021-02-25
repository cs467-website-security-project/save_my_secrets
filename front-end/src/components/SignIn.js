import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
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
          props.onAuthChange(true);
          props.setUserId(res.data);
          props.setUsername(username.value);
          setShowSignInForm(false);
          setShowRegisterForm(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log('Invalid credentials');
          props.signInAttempt(true);
        } else {
          console.log('Issue with Authentication server');
          props.signInAttempt(true);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.buttons}>
      {showSignInForm && (
        <>
          <div className={classes.paper}>
            <SetSecurityLevel />
            <InfoOutlinedIcon color="primary" fontSize="large" />
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
              <ButtonGroup variant="contained" color="primary" className={classes.buttons}>
                <Button type="submit" variant="contained" color="primary">
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowRegisterForm(true)}
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
};

export default SignIn;
