import React from 'react';
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

const rows = [
  { user: 'anonymous', dateAdded: '1/19/21' },
  { user: 'elliotalderson', dateAdded: '6/7/20' },
];

const Admin = () => {
  const classes = useStyles();

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
            {rows.map((row) => (
              <TableRow key={row.user}>
                <TableCell component="th" scope="row">
                  {row.user}
                </TableCell>
                <TableCell align="right">{row.dateAdded}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Admin;
