import React, { useEffect, useState } from "react";
import {Button,Table} from "react-bootstrap";
import { fetchAllUser } from "../services/UserServices";
import Paginate from "./Paginate";
import ModalComponent from "./ModalComponent";

function TableUser() {
  const [listUsers, setListUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
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
  const [isShowModal,setIsShowModal] = useState(false);
  const handleClose = () => {
    setIsShowModal(false);
  };
  const handleUpdateList = (user) => {
    setListUsers([user,...listUsers])
  };

  return (
    <>
         <div className="mt-4 mb-3 d-flex justify-content-between align-align-items-center">
         <h3> Manage User</h3>
         <Button onClick={()=>setIsShowModal(true)} variant="success">Add</Button>
        </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
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
      <ModalComponent show={isShowModal} handleClose={handleClose} handleUpdateList={handleUpdateList}/>

    </>
  );
}

export default TableUser;
