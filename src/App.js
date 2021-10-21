import GlobalStyle from "./globalStyles";
import Navbar from "./components/Navbar/Navbar";
import FormWrapper from "./components/Form/FormWrapper";
import Home from "./pages/Home";
import InvoicePage from "./pages/InvoicePage";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <Navbar />
      <FormWrapper />

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/invoice/:id">
          <InvoicePage />
        </Route>
      </Switch>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  background-color: #f8f8fb;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;
