import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../styles/index.css';
import { ThemeProvider } from './ThemeContext';
import App from './App'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ThemeProvider>
);
