import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserServices";
function TableUser() {
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    getUser();
  },[])
  const getUser = async () => {
    let res = await fetchAllUser();
    if (res && res.data) {
      setListUsers(res.data);
    }
  };

  return (
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
        {listUsers && listUsers.length > 0 &&
          listUsers.map((item, index) => (
            <tr key={`user-${index}`}>
              <td>{index + 1}</td>
              <td>{item.email}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default TableUser;
