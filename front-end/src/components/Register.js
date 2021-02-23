import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';

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
  buttons: {
    // display: 'block',//TODO: center buttons?
  },
}));

const Register = () => {
  const classes = useStyles();
  const [registerSuccess, setregisterSuccess] = useState(false);
  const [usernameInUse, setusernameInUse] = useState(false);
  const [serverError, setserverError] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    const hashedPwd = CryptoJS.SHA512(password.value).toString(CryptoJS.enc.Hex);
    const payload = {
      username: username.value,
      password: hashedPwd,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVICE}/register`, payload, config)
      .then((res) => {
        if (res.status === 200) {
          console.log('SUCCESS');
          setregisterSuccess(true);
          setusernameInUse(false);
          setserverError(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (!error.status) {
          console.log('Network error.');
        } else if (error.response.status === 400) {
          setusernameInUse(true);
          setregisterSuccess(false);
          setserverError(false);
        } else {
          console.log('server error');
          setserverError(true);
          setusernameInUse(false);
          setregisterSuccess(false);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.buttons}>
      <div className={classes.paper}>
        <div>Register as a new user!</div>
        <form className={classes.form} noValidate onSubmit={handleRegister}>
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
            <Button type="submit" variant="outlined" color="primary">
              Register
            </Button>
          </ButtonGroup>
        </form>
      </div>
      <br />
      <br />
      {registerSuccess && <div>You successfully registered! </div>}
      {usernameInUse && <div>This username is already in use. </div>}
      {serverError && <div>There was a server error, please try again. </div>}
    </Container>
  );
};

export default Register;
