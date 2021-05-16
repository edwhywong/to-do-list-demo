import { createMuiTheme } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'sans-serif',
    allVariants: {
      color: '#2D3748',
    },
  },
});
