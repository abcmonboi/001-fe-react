import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import {  useEffect } from "react";
// import { UserContext } from "./context/UserContext";
import AppRouters from "./routers/AppRouters";
import { useSelector } from "react-redux";
import { handleGetUserRedux } from "./redux/actions/userActions";
import { useDispatch } from "react-redux";

function App() {
  // const { loginContext } = useContext(UserContext);
  // console.log(a.ss)
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user);
  useEffect(() => {
    if (dataUser?.email && dataUser?.token) {
      dispatch(handleGetUserRedux)
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
