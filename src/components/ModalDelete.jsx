import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Loading from "./Loading";
import { deleteUser } from "../services/UserServices";
import { toast } from "react-toastify";
const ModalDelete = ({ delInfoUser, show, handleClose, handleUpdateList }) => {
  const [isloading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    delUser();
  };
  const delUser = async () => {
    let res = await deleteUser(delInfoUser?.id);
    if (res && res.statusCode === 204) {
      handleUpdateList(delInfoUser?.id);
      toast.success("Delete user success");
      setIsLoading(false);
      handleClose();
    } else {
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
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isloading ? (
            <div className="d-flex justify-content-center">
              <Loading />
            </div>
          ) : (
            <>
              <h3>
                Are you sure to delete user{" "}
                <b className="text-primary">
                  {`${delInfoUser.first_name} ${delInfoUser.last_name}`}{" "}
                </b>
              </h3>
              <b>{`Email: ${delInfoUser.email}`}</b>
            </>
          )}
        </Modal.Body>
        {!isloading && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={() => handleConfirm()} variant="danger">
              Confirm
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default ModalDelete;
