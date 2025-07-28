import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Add MUI theme imports
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Define a modern, minimal theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7B3F00', // Muted brown
      contrastText: '#fff',
      dark: '#5a2d00',
      light: '#a86b3c',
    },
    background: {
      default: '#f9f7f6', // Soft white
      paper: '#fff',
    },
    text: {
      primary: '#2d1c0b',
      secondary: '#7B3F00',
    },
    action: {
      hover: '#f3e9e3',
    },
    divider: '#e0cfc2',
  },
  typography: {
    fontFamily: 'Roboto, "Segoe UI", Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: 'primary',
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
