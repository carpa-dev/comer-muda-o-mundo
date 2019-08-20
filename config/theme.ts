import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
    background: {
      default: '#fff',
    },
  },
});

export default theme;
