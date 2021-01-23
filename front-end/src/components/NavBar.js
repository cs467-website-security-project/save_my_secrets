import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    alignItems: 'flex-end', // TODO: fix this, not working
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button>
            <NavLink to="/" className={classes.link}>
              Home
            </NavLink>
          </Button>
          <Button>
            <NavLink to="/About" className={classes.link}>
              About
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
