import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalStyles';
import { defaultTheme } from '../styles/themes/default';
import { CyclesContextProvider } from './Contexts/CyclesContext';
import { Router } from './router';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
