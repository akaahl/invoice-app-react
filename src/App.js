import GlobalStyle from "./globalStyles";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import InvoicePage from "./pages/InvoicePage";
import styled from "styled-components";

function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <Navbar />

      {/* <Home /> */}
      <InvoicePage />
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
