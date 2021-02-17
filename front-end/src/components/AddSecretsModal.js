import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddSecretsModal = ({ userId, secretUpdate, secretUpdateCount }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [secret, setSecret] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(false);

    const newSecret = new URLSearchParams();
    newSecret.append('secret', secret);
    newSecret.append('userId', userId);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVICE}/user/secret`, newSecret, config)
      .then((res) => {
        if (res.status === 200) {
          secretUpdate(secretUpdateCount + 1);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log(`Issue with saving secret for user_id:${userId}`);
        } else {
          console.log('505: There is an issues with the server');
        }
      });
  };

  const handleTextChange = (e) => {
    setSecret(e.target.value);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add New Secret Here</h2>
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        defaultValue="My secret is..."
        variant="outlined"
        inputProps={{ maxLength: 120 }}
        onChange={handleTextChange}
      />
      <button type="button" onClick={handleAdd}>
        Add the secret
      </button>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add New Secrets
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

AddSecretsModal.propTypes = {
  // eslint-disable-next-line react/require-default-props
  userId: PropTypes.number,
  secretUpdate: PropTypes.func.isRequired,
  secretUpdateCount: PropTypes.number.isRequired,
};

export default AddSecretsModal;
