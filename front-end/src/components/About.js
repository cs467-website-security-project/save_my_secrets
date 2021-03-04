import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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

export default function About() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className={classes.buttons}>
      <Box my={4}>
        <Typography variant="h6" component="h5" gutterBottom>
          Welcome to save my secrets 1.5!
          <br />
          This is the final release version for the CS467 class
          <br />
          <br />
          In this version we have implemented the following features:
          <br />
          <ul>
            <li>Secrets are encrypted and decrypted on front-end</li>
            <li>
              Added recaptcha v2 which keeps login/register button disabled until it is passed.
            </li>
            <li>Dropdown menu links finally link to other live sites.</li>
            <li>Strong passwords are enforced with a strength bar provided</li>
            <li>
              Back-end has middleware to prevent bruteforcing on /login and /register endpoints.
            </li>
          </ul>
          Hope you enjoy the website and Happy hacking!
        </Typography>
      </Box>
    </Container>
  );
}
