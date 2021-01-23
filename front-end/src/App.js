import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Route, HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <Container maxWidth="sm">
      <HashRouter>
        <NavBar />
        <Box my={4}>
          <Route exact path="/" component={SignIn} />
          <Route path="/about" component={About} />
        </Box>
      </HashRouter>
    </Container>
  );
}
