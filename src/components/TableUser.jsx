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
  const [orderBy, setOrderBy] = useState("");
  const [orderField, setOrderField] = useState("");
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
  const handleSort = (sortedBy, sortedField) => {
    setOrderBy(sortedBy);
    setOrderField(sortedField);
    let newList = _.cloneDeep(listUsers);
    newList = _.orderBy(listUsers, [sortedField], [sortedBy]);
    setListUsers(newList);
  };
  return (
    <>
      <div className="mt-4 mb-3 d-flex justify-content-between align-align-items-center">
        <h3> Manage User </h3>
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
            <th>
              <div className="table-header">
                <span>ID</span>
                {(orderBy === "desc" && orderField === "id") ? (
                <i
                  onClick={() => handleSort("asc", "id")}
                  className="fa-solid fa-arrow-up-9-1"
                ></i>
                ) :(
                <i
                  onClick={() => handleSort("desc", "id")}
                  className="fa-solid fa-arrow-down-1-9"
                ></i>
                )}
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="table-header">
                <span>First Name</span>
                {(orderBy === "desc" && orderField === "first_name") ?(
                <i
                  onClick={() => handleSort("asc", "first_name")}
                  className="fa-solid fa-arrow-up-z-a"
                ></i>) :(
                <i
                  onClick={() => handleSort("desc", "first_name")}
                  className="fa-solid fa-arrow-down-a-z"
                ></i>)}
              </div>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => (
              <tr key={`user-${index}`}>
                <td width={"5%"}>{item.id}</td>
                <td>{item?.email}</td>
                <td width={"20%"}>{item?.first_name}</td>
                <td>{item?.last_name}</td>
                <td width={"8%"}>
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
     
        <>
          <ModalComponent
            editUser={editUser}
            mode={mode}
            show={isShowModal}
            handleClose={handleClose}
            handleUpdateList={handleUpdateList}
          />
 {editUser  && (
          <ModalDelete
            mode={mode}
            delInfoUser={editUser}
            show={isShowModalDelete}
            handleClose={handleClose}
            handleUpdateList={handleUpdateList}
          />
        )}
        </>

    </>
  );
}

export default TableUser;
