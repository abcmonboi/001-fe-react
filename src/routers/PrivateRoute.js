import React from "react";
import TableUsers from "../components/TableUser";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";
// import Container from "react-bootstrap/Container";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);

  if(user && !user.auth){
    return <>
       <Alert variant="danger" className="mt-5" >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
        Users need to log in to access this feature.
        </p>
      </Alert>
    </>
  }
  return (
    <>
      {/* <Container> */}
      <TableUsers />
      {/* </Container> */}
    </>
  );
};

export default PrivateRoute;
