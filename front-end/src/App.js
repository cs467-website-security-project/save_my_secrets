import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Route, HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import SignIn from './components/SignIn';
import User from './components/User';
import GuardedRoute from './GuardedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signInAttempt, setSignInAttempt] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <Container maxWidth="sm">
      <HashRouter>
        <NavBar />
        <Box my={4}>
          <Route
            exact
            path="/"
            render={(props) => (
              <SignIn
                {...props}
                onAuthChange={setIsAuthenticated}
                signInAttempt={setSignInAttempt}
                setUserId={setUserId}
                setUsername={setUsername}
              />
            )}
          />
          <Route path="/about" component={About} />
          <GuardedRoute
            path="/user"
            component={User}
            auth={isAuthenticated}
            signInAttempt={signInAttempt}
            userId={userId}
            username={username}
          />
        </Box>
      </HashRouter>
    </Container>
  );
};

export default App;
