import './App.css';
import User from './components/User.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[600],
    },
    secondary: {
      main: grey[500],
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <User/>
      </ThemeProvider>
    </div>
  );
}

export default App;
