import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/DeleteRounded';
import Moment from 'moment';

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

const Admin = () => {
  const classes = useStyles();
  const [users, getUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  const getUserData = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVICE}/admin/get-users`)
      .then((res) => {
        if (res.status === 200) {
          const responseData = res.data;
          responseData.map((user) => {
            // eslint-disable-next-line no-param-reassign
            user.date_added = Moment(user.date_added).format('MM/DD/YYYY');
            return user;
          });
          getUsers([...responseData]);
          setUserCount(responseData.length);
        }
        if (res.status === 204) {
          console.log(`No users available`);
          getUsers([]);
        }
      })
      .catch((err) => {
        console.log(`User.js ERROR: ${err}`);
      });
  };

  const deleteUser = (userId) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_SERVICE}/user/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setUserCount(userCount - 1);
        }
      })
      .catch((err) => {
        console.log(`Error with User DELETE: ${err}`);
      });
  };

  useEffect(() => {
    getUserData();
  }, [userCount]);

  return (
    <Container component="main" maxWidth="xs" className={classes.buttons}>
      <Box>
        <Typography variant="h5">Hello Admin! Change user settings</Typography>
      </Box>
      <TableContainer>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell align="right">Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={`${user}_${idx}`}>
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell align="right">{user.date_added}</TableCell>
                <td>
                  <IconButton onClick={() => deleteUser(user.user_id)}>
                    <Delete />
                  </IconButton>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Admin;
