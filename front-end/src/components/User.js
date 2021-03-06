import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CryptoJS from 'crypto-js';

import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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

const User = (props) => {
  const classes = useStyles();
  const [secrets, setSecrets] = useState([]);
  const [secretUpdate, setSecretUpdate] = useState(0);
  const { userId, username } = props;

  const getAllSecrets = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVICE}/user/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setSecrets(res.data);
        }
      })
      .catch((err) => {
        console.log(`User.js ERROR: ${err}`);
      });
  };

  useEffect(() => {
    getAllSecrets();
  }, [secretUpdate]);

  const deleteSecret = (secretId) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_SERVICE}/delete-secret/${secretId}`)
      .then((res) => {
        if (res.status === 200) {
          setSecretUpdate(secretUpdate - 1); // re-render the page
        }
      })
      .catch((err) => {
        console.log(`Error on delete: ${err}`);
      });
  };

  const decryptSecret = (cipher) =>
    CryptoJS.AES.decrypt(cipher, `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8);

  return (
    <Container component="main" maxWidth="xs" className={classes.buttons}>
      <Box mb={3}>
        <Typography variant="h5">
          Here are your secrets&nbsp;
          {username}
        </Typography>
      </Box>
      <AddSecretsModal
        userId={userId}
        secretUpdate={setSecretUpdate}
        secretUpdateCount={secretUpdate}
      />
      <TableContainer>
        <Table aria-label="secrets table">
          <TableBody>
            {secrets.map((row) => (
              <TableRow key={row.secret}>
                <TableCell component="th" scope="row">
                  {decryptSecret(row.secret)}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteSecret(row.secret_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

User.propTypes = {
  // eslint-disable-next-line react/require-default-props
  userId: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  username: PropTypes.string,
};

export default User;
