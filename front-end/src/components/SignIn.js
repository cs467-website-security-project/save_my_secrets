import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SetSecurityLevel from './SetSecurityLevel';
import creds from '../config/default.json';

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

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    console.log({ username: username.value, password: password.value });

    const adminUser = creds.admin.username;
    const adminPass = creds.admin.password;

    if (adminUser === username.value && adminPass === password.value) {
      history.push('/admin');
    } else {
      console.log('fail');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.buttons}>
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
            <Button type="submit" variant="outlined" color="primary">
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
    </Container>
  );
};

export default SignIn;
