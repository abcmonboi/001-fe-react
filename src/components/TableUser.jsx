import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { fetchAllUser } from "../services/UserServices";
import Paginate from "./Paginate";
import ModalComponent from "./ModalComponent";
import _ from "lodash";
import ModalDelete from "./ModalDelete";

function TableUser() {
  const [listUsers, setListUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [mode, setMode] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  useEffect(() => {
    getUser(page);
  }, [page]);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalPage(res.total_pages);
    }
  };
  const handleChangePage = (item) => {
    setPage(item);
  };
  const handleClose = () => {
    setMode("");
    setIsShowModal(false);
    setIsShowModalDelete(false);
  };
  const handleUpdateList = (user) => {
    if (mode === "add") {
      setListUsers([user, ...listUsers]);
    } else if (mode === "edit") {
      let pos = listUsers.findIndex((item) => item.id === user.id);
      let newList = _.cloneDeep(listUsers);
      newList[pos].first_name = user.first_name;
      setListUsers(newList);
    } else {
      let newList = _.cloneDeep(listUsers);
      newList = newList.filter((item) => item.id !== user);
      setListUsers(newList);
    }
  };
  const handleDelete = (user) => {
    setIsShowModalDelete(true);
    setEditUser(user);
  };

  return (
    <>
      <div className="mt-4 mb-3 d-flex justify-content-between align-align-items-center">
        <h3> Manage User</h3>
        <Button
          onClick={() => {
            setEditUser(null);
            setMode("add");
            setIsShowModal(true);
          }}
          variant="success"
        >
          Add
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => (
              <tr key={`user-${index}`}>
                <td>{item.id}</td>
                <td>{item?.email}</td>
                <td>{item?.first_name}</td>
                <td>{item?.last_name}</td>
                <td width={"10%"}>
                  <div className="d-flex justify-content-center gap-4">
                    <Button
                      variant="warning"
                      onClick={() => {
                        setMode("edit");
                        setIsShowModal(true);
                        setEditUser(item);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDelete(item);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {listUsers && listUsers.length > 0 && (
        <Paginate
          totalPage={totalPage}
          page={page}
          handleChangePage={handleChangePage}
        />
      )}
      {editUser && (
        <>
          <ModalComponent
            editUser={editUser}
            mode={mode}
            show={isShowModal}
            handleClose={handleClose}
            handleUpdateList={handleUpdateList}
          />

          <ModalDelete
            mode={mode}
            delInfoUser={editUser}
            show={isShowModalDelete}
            handleClose={handleClose}
            handleUpdateList={handleUpdateList}
          />
        </>
      )}
    </>
  );
}

export default TableUser;
