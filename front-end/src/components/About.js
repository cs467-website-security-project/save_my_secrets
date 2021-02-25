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
          Welcome to save my secrets 1.4!
          <br />
          In this version we have implemented the following features
          <br />
          <ul>
            <li>Hashing and salting of passwords</li>
            <li>Admin ability to view and delete users</li>
            <li>User ability to delete secrets</li>
          </ul>
          Hope you enjoy the updated website and Happy hacking!
        </Typography>
      </Box>
    </Container>
  );
}
