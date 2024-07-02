import React from 'react'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
const FormGroup = ({
    controlId,
    label,
    type,
    placeholder,
    setPayload,
    payload,

}) => {

  return (
    <Form.Group as={Row} className="mb-3" controlId={controlId}>
    <Form.Label column sm="2">
    {label}
    </Form.Label>
    <Col sm="10">
      <Form.Control
        onChange={(e) => {
          setPayload({ ...payload, [controlId]: e.target.value });
        }}
        //hover to  validate the forms
        isValid={payload[controlId] && payload[controlId].length > 0}
        type={type}
        placeholder={placeholder}
        value={payload[controlId]}
      />
    </Col>

   
  </Form.Group>
  )
}

export default FormGroup