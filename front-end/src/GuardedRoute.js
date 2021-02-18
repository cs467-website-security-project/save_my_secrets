import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import SigninFail from './components/SigninFail';
import Admin from './components/Admin';

const GuardedRoute = ({ component: Component, auth, signInAttempt, userId, username }) => (
  <Route
    render={
      (props) => {
        if (auth === true && userId === 1) {
          return <Admin />;
        }
        if (auth === true && userId > 1) {
          return <Component {...props} userId={userId} username={username} />;
        }
        return <SigninFail auth={auth} signInAttempt={signInAttempt} />;
      }
      // eslint-disable-next-line react/jsx-curly-newline
    }
  />
);

GuardedRoute.propTypes = {
  auth: PropTypes.bool.isRequired,
  signInAttempt: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/require-default-props
  userId: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  username: PropTypes.string,
};

export default GuardedRoute;
