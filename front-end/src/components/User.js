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

const rows = [
  { secret: 'sample secret 1', dateAdded: '1/19/21' },
  { secret: 'sample secret 2', dateAdded: '6/7/20' },
];

export default function User() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.buttons}>
      <Box>
        <Typography variant="h5">Hello user! Here are your secrets.</Typography>
      </Box>
      <AddSecretsModal />
      <TableContainer>
        <Table aria-label="secrets table">
          <TableHead>
            <TableRow>
              <TableCell>Secret</TableCell>
              <TableCell align="right">Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.secret}>
                <TableCell component="th" scope="row">
                  {row.secret}
                </TableCell>
                <TableCell align="right">{row.dateAdded}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
