import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import SigninFail from './components/SigninFail';

const GuardedRoute = ({ component: Component, auth, signInAttempt }) => (
  <Route
    render={
      (props) =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <SigninFail auth={auth} signInAttempt={signInAttempt} />
        )
      // eslint-disable-next-line react/jsx-curly-newline
    }
  />
);

GuardedRoute.propTypes = {
  auth: PropTypes.bool.isRequired,
  signInAttempt: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired,
};

export default GuardedRoute;
