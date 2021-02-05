import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Box from '@material-ui/core/Box';
// import Table from '@material-ui/core/Table';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AddSecretsModal from './AddSecretsModal';

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

const User = ({ userId }) => {
  const classes = useStyles();
  // const [rows, setRows] = useState([]);
  let rows;

  axios
    .get(`${process.env.REACT_APP_BACKEND_SERVICE}/user/${userId}`)
    .then((res) => {
      if (res.status === 200) {
        console.log('SUCCESS');
        rows = res.data;
        console.log(rows);
      }
    })
    .catch((err) => {
      if (err.response.status === 401) {
        console.log('Invalid credentials');
      } else {
        console.log(`Uncaught error: '${err}'`);
      }
    });

  return (
    <Container component="main" maxWidth="xs" className={classes.buttons}>
      <Box>
        <Typography variant="h5">Hello user! Here are your secrets.</Typography>
      </Box>
      <AddSecretsModal />
      <Typography>{rows[0]}</Typography>
    </Container>
  );
};

User.propTypes = {
  // eslint-disable-next-line react/require-default-props
  userId: PropTypes.number,
};

export default User;
