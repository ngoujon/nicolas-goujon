import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Maintenance from './pages/Maintenance';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#172845',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#172845',
      paper: '#172845',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Comforta", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Comforta", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 'bold',
    },
    h2: {
      fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
});

function App() {
  const [isMaintenance, setIsMaintenance] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/bio" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/stack" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/formation" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/projets" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/contact" element={isMaintenance ? <Maintenance /> : <Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
