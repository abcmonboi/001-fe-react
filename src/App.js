import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRouters from "./routers/AppRouters";

function App() {
  const { loginContext } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Header />
      <Container>
        <AppRouters />
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
