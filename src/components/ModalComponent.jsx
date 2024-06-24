import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import FormGroup from "./FormGroup";
import { createUser } from "../services/UserServices";
import { toast } from "react-toastify";
const ModalComponent = ({ show, handleClose, handleUpdateList }) => {
  const [payload, setPayload] = useState({
    name: "",
    job: "",
  });
  const handleSave = async (payload) => {
    let res = await createUser(payload);
    if (res && res.id) {
      handleClose();
      setPayload({
        name: "",
        job: "",
      });
      toast.success("Create user success");
      handleUpdateList({ first_name: res.name, job: res.job, id: res.id });
    }else {
      toast.error("Create user failed");
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup
              controlId="name"
              label="Name"
              type="text"
              placeholder="morpheus"
              setPayload={setPayload}
              payload={payload}
            />
            <FormGroup
              controlId="job"
              label="Job"
              type="text"
              placeholder="leader"
              setPayload={setPayload}
              payload={payload}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={!payload.name || !payload.job}
            onClick={() => handleSave(payload)}
            variant="dark"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
