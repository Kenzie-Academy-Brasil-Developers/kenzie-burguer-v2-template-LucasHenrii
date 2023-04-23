import { ToastContainer } from "react-toastify";
import Router from "./routes";
import { GlobalStyles } from "./styles/global";

const App = () => (
  <>
    <GlobalStyles />
    <Router />
    <ToastContainer autoClose={1800} theme={"light"} />
  </>
);

export default App;
