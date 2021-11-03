import React, { useState, useEffect } from 'react';
import GlobalStyle from './globalStyles';
import Navbar from './components/Navbar/Navbar';
import FormWrapper from './components/Form/FormWrapper';
import Home from './pages/Home';
import InvoicePage from './pages/InvoicePage';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './themes';
import { AnimatePresence } from 'framer-motion';

function App() {
  const formModal = useSelector(state => state.root.formModal);
  const [theme, setTheme] = useState('lightTheme');
  const location = useLocation();

  return (
    <ThemeProvider theme={theme === 'lightTheme' ? lightTheme : darkTheme}>
      <StyledApp>
        <GlobalStyle />
        <Navbar theme={theme} setTheme={setTheme} />
        <AnimatePresence>{formModal && <FormWrapper />}</AnimatePresence>

        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/invoice/:id">
              <InvoicePage />
            </Route>
          </Switch>
        </AnimatePresence>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;

const StyledApp = styled.div`
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;
`;
