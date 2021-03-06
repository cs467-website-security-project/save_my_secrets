import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';

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
  const [statePassword, setStatePassword] = useState('');
  const [disableRegister, setDisableRegister] = useState(true);

  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  const checkPassword = (password) => {
    if (strongRegex.test(password)) {
      setDisableRegister(false);
    } else {
      setDisableRegister(true);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    const salt = CryptoJS.lib.WordArray.random(16).toString();
    const payload = {
      username: username.value,
      password: password.value,
      salt,
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
        if (error.response.status === 400) {
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
            onChange={(e) => {
              setStatePassword(e.target.value);
              checkPassword(statePassword);
            }}
          />
          <PasswordStrengthBar password={statePassword} minLength={8} />
          <div>
            Password must be at least 8 characters long, have 1 lowercase, 1 uppercase, 1 number,
            and 1 special character (!@#$%^&).
          </div>
          <ButtonGroup variant="contained" color="primary" className={classes.buttons}>
            <Button type="submit" variant="outlined" color="primary" disabled={disableRegister}>
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
