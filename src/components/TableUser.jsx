import "./TableUser.scss";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { fetchAllUser } from "../services/UserServices";
import Paginate from "./Paginate";
import ModalComponent from "./ModalComponent";
import _ from "lodash";
import _debounce from "lodash/debounce";
import ModalDelete from "./ModalDelete";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import fileUrl from "../template_file/users_template.csv";
import Papa from "papaparse";
import Loading from "./Loading";

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
  const [csvData, setCsvData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getUser(page);
  }, [page]);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalPage(res.total_pages);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
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
  const handleSearch = _debounce((e) => {
    let tempValue = e.target.value;

    if (tempValue) {
      let tempList = _.cloneDeep(listUsers);
      tempList = tempList.filter((item) => item.email.includes(tempValue));
      setListUsers(tempList);
    } else {
      getUser(page);
    }
  }, 300);

  const exportCSVUser = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push([`ID`, `Email`, `First Name`, `Last Name`]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item?.id;
        arr[1] = item?.email;
        arr[2] = item?.first_name;
        arr[3] = item?.last_name;
        return result.push(arr);
      });
      setCsvData(result);
      done();
    }
  };
  const handleImportCSV = (e) => {
    let file = e.target.files[0];
    if (file?.type !== "text/csv") {
      toast.error("Wrong format !!! Only accept CSV type");
    } else {
      Papa.parse(file, {
        header: false,
        complete: function (responses) {
          let result = responses.data;
          if (result.length > 0) {
            if (result[0] && result[0]?.length === 3) {
              if (
                result[0][0] !== "email" ||
                result[0][1] !== "first_name" ||
                result[0][2] !== "last_name"
              ) {
                toast.error(
                  "Wrong header format !!! File have error at header"
                );
              } else {
                let final = [];
                result.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    final.push(obj);
                  }
                  return final;
                });
                setListUsers(final);
              }
            } else {
              toast.error("Wrong header format !!! Header mush have 3 col");
            }
          } else {
            toast.error("Wrong file !!! File is empty");
          }
        },
      });
    }
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "users_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div className="mt-4 mb-3 d-sm-flex justify-content-between align-align-items-center">
        <h3> Manage User </h3>
        <div className="button-group">
          <button
            onClick={() => {
              handleDownload();
            }}
            className="btn btn-secondary"
          >
            <i className="fa-solid fa-download"></i>
            <span>Template</span>
          </button>

       
          <label htmlFor="importCSV" className="btn btn-info">
            <i className="fa-solid fa-file-csv"></i>
            <span>Import</span>
          </label>
          <input
            onChange={(e) => handleImportCSV(e)}
            type="file"
            id="importCSV"
            hidden
          ></input>
          <CSVLink
            asyncOnClick={true}
            filename="users"
            className="btn btn-warning"
            data={csvData}
            onClick={exportCSVUser}
          >
            <i className="fa-solid fa-file-export"></i>
            <span>Export</span>
          </CSVLink>
          <button
            onClick={() => {
              setEditUser(null);
              setMode("add");
              setIsShowModal(true);
            }}
            className="btn btn-success"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add</span>
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4 ">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <i className="fa-solid fa-magnifying-glass"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="Search user by email...."
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => handleSearch(e)}
          />
        </InputGroup>
      </div>
      {isloading ? (
        <div
          className="d-flex justify-content-center align-items-center table-loading"
        >
          <Loading />
        </div>
      ) : (
        <>
           <div className="customize-tablemobile table-loading">
          <Table
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th>
                  <div className="table-header">
                    <span>ID</span>
                    {orderBy === "desc" && orderField === "id" ? (
                      <i
                        onClick={() => handleSort("asc", "id")}
                        className="fa-solid fa-arrow-up-9-1"
                      ></i>
                    ) : (
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
                    {orderBy === "desc" && orderField === "first_name" ? (
                      <i
                        onClick={() => handleSort("asc", "first_name")}
                        className="fa-solid fa-arrow-up-z-a"
                      ></i>
                    ) : (
                      <i
                        onClick={() => handleSort("desc", "first_name")}
                        className="fa-solid fa-arrow-down-a-z"
                      ></i>
                    )}
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
                    <td width={"5%"}>
                      <div className="d-flex justify-content-center button-group-action">
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
        </div>
        </>
      )}
      {listUsers && listUsers.length > 0 && (
        <Paginate
          totalPage={totalPage}
          page={page}
          handleChangePage={handleChangePage}
        />
      )}


      <ModalComponent
        editUser={editUser}
        mode={mode}
        show={isShowModal}
        handleClose={handleClose}
        handleUpdateList={handleUpdateList}
      />
      {editUser && (
        <ModalDelete
          mode={mode}
          delInfoUser={editUser}
          show={isShowModalDelete}
          handleClose={handleClose}
          handleUpdateList={handleUpdateList}
        />
      )}
    </>
  );
}

export default TableUser;
