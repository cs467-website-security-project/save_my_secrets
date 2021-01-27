import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Route, HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import SignIn from './components/SignIn';
import User from './components/User';
import Admin from './components/Admin';
import GuardedRoute from './GuardedRoute';

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  return (
    <Container maxWidth="sm">
      <HashRouter>
        <NavBar />
        <Box my={4}>
          <Route
            path="/"
            render={(props) => <SignIn {...props} onAuthChange={setisAuthenticated} />}
          />
          <Route path="/about" component={About} />
          <Route path="/user" component={User} />
          <GuardedRoute path="/admin" component={Admin} auth={isAuthenticated} />
        </Box>
      </HashRouter>
    </Container>
  );
};

export default App;
