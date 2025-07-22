import Layout from "./components/Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Layout />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
