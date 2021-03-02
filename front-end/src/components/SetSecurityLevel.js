import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SetSecurityLevel() {
  const classes = useStyles();

  const handleChange = (event) => {
    switch (event.target.value) {
      case '1.0':
        window.location.href = 'http://35.224.40.226:5000/#/';
        break;
      case '1.3.2':
        window.location.href = 'http://35.224.60.191:5000/#/';
        break;
      case '1.4':
        window.location.href = 'http://34.122.127.218:5000/#/';
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className={classes.div}>Select Website Version</div>
      <FormControl className={classes.formControl}>
        <Select labelId="secLevel-label" id="secLevel" onChange={handleChange}>
          <MenuItem value="1.0">v1.0</MenuItem>
          <MenuItem value="1.3.2">v1.3.2</MenuItem>
          <MenuItem value="1.4">v1.4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
