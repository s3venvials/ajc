import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const ConfirmPassCode = (props) => {
  const [passCode, setPassCode] = useState("");
  const [resMsg, setResMsg] = useState("");
  const [spinner, showSpinner] = useState(false);

  const sendPassCodeConfirm = (value) => props.receivePassCodeConfirm(value);

  const handleSubmit = async (event) => {
    try {
      setResMsg("");
      showSpinner(true);
      event.preventDefault();

      const res = await axios.post(
        "/api/user/verify_email",
        { passCode },
        { withCredentials: true }
      );

      if (res.data.Message) {
          setTimeout(() => {
            showSpinner(false);
            sendPassCodeConfirm({
                showPassCodeField: false,
                Message: res.data.Message,
              });
          }, 600);
      } else {
        setResMsg(res.data.Error);
        showSpinner(false);
      }
    } catch (error) {
      showSpinner(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {resMsg && <Alert variant="danger">{resMsg}</Alert>}
      <Form.Group>
        <Form.Label>Confirm Pass Code</Form.Label>
        <Form.Control
          type="text"
          value={passCode}
          name="passCode"
          onChange={(event) => setPassCode(event.target.value)}
        />
      </Form.Group>

      {spinner ? (
        <Button>
          <Spinner
            animation="border"
            size="sm"
            role="status"
            as="span"
          ></Spinner>{" "}
          Submitting...
        </Button>
      ) : (
        <Button type="submit" variant="primary">
          <i className="far fa-paper-plane"> Submit</i>
        </Button>
      )}
    </Form>
  );
};

export default ConfirmPassCode;
