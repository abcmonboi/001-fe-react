import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import FormGroup from "./FormGroup";
import { createUser, updateUser } from "../services/UserServices";
import { toast } from "react-toastify";
import Loading from "./Loading";

const ModalComponent = ({
  editUser,
  mode,
  show,
  handleClose,
  handleUpdateList,
}) => {
  const [payload, setPayload] = useState({
    name: "",
    job: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const handleSave = async (payload) => {
    setIsLoading(true);
    mode ==="edit" ? handleUpdate(payload) : handleCreate(payload);
  };
  const handleCreate = async (payload) => {
    let res = await createUser(payload);
    if (res && res.id && res.name && res.job) {
      setIsLoading(false);
      handleClose();
      setPayload({
        name: "",
        job: "",
      });
      toast.success("Create user success");
      handleUpdateList({ first_name: res.name,   id: res?.id });
    } else {
      setIsLoading(false);
      toast.error("Create user failed");
    }
  };
  const handleUpdate = async (payload) => {
    let res = await updateUser(payload);
    if (res && res.updatedAt) {
      setIsLoading(false);
      handleClose();
      setPayload({
        name: "",
        job: "",
      });
      toast.success("Update user success");
      handleUpdateList({ first_name: res.name, job: res.job, id: editUser.id });
    } else {
      setIsLoading(false);
      toast.error("Update user failed");
    }
  };
  useEffect(() => {
    if (mode === "edit") {
      setPayload({
        name: editUser?.first_name,
        job: editUser?.job || "",
        id: editUser?.id
      });
    } else {
      setPayload({
        name: "",
        job: "",
      });
    }
  }, [editUser, mode]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{mode ==="edit" ? "Update User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isloading ? (
            <div className="d-flex justify-content-center">
              <Loading />
            </div>
          ) : (
            <Form>
              <FormGroup
                controlId="name"
                label="Name"
                type="text"
                placeholder="morpheus"
                setPayload={setPayload}
                payload={payload}
                value={mode ==="edit" ? editUser?.first_name : ""}
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
          )}
        </Modal.Body>
        {!isloading && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={!payload.name }
              onClick={() => handleSave(payload)}
              variant="dark"
            >
              {mode ==="edit" ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default ModalComponent;
