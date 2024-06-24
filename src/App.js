import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import {Container,Button} from "react-bootstrap";
import ModalComponent from "./components/ModalComponent";
import { useState } from "react";
function App() {
  const [isShowModal,setIsShowModal] = useState(false);
  const handleClose = () => {
    setIsShowModal(false);
  };
  return (
    <div className="App">
      <Header />
      <Container>
        <div className="mt-4 mb-3 d-flex justify-content-between align-align-items-center">
         <h3> Manage User</h3>
         <Button onClick={()=>setIsShowModal(true)} variant="success">Add</Button>
        </div>
        <TableUser />
      </Container>
      <ModalComponent show={isShowModal} handleClose={handleClose}/>
    </div>
  );
}

export default App;
