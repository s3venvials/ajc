import React, { useState } from "react";
import { Container, Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { history } from "../helpers";

const UnSubscribePage = () => {
  const id = window.location.pathname.split("/")[2];
  const [spinner, setSpinner] = useState(false);
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [other, setOther] = useState("");
  const [resMsg, setResMsg] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post("/api/user/unsubscribe", { id, response, other });

      setSpinner(true);
      setResMsg("You have been successfully unsubscribed. Returning to the home page.");

      if (res.status === 200) {
        setTimeout(() => {
          setSpinner(false);
          setResMsg("");
          history.push("/");
        }, 3000);
      }
    } catch (error) {}
  };

  return (
    <Container style={{ marginTop: "2em" }}>
      <h4>UnSubscribe</h4>

      {resMsg && <Alert variant="success">{resMsg}</Alert>}

      <h6>
        Sorry to see you go. If you dont mind would you be willing to tell us
        why you are unsubscribing?
      </h6>

      <Form onSubmit={handleSubmit}>
        <Form.Check
          type="radio"
          checked={value === "1"}
          name="radio"
          value="1"
          onChange={(e) => {
            setValue(e.currentTarget.value);
            setResponse("Not interested in the content this website provides.");
            setOther("");
          }}
          label="Not interested in the content this website provides."
        />

        <Form.Check
          type="radio"
          checked={value === "2"}
          name="radio"
          value="2"
          onChange={(e) => {
            setValue(e.currentTarget.value);
            setResponse("I'm not learning anything of value.");
            setOther("");
          }}
          label="I'm not learning anything of value."
        />

        <Form.Check
          type="radio"
          checked={value === "3"}
          name="radio"
          value="3"
          onChange={(e) => {
            setValue(e.currentTarget.value);
            setResponse("");
          }}
          label="Other"
        />

        <Form.Group>
          {value === "3" ? (
            <Form.Control
              as="textarea"
              rows="2"
              value={other}
              onChange={(e) => setOther(e.target.value)}
            />
          ) : (
            <Form.Control
              as="textarea"
              disabled
              rows="2"
              value={other}
              onChange={(e) => setOther(e.target.value)}
            />
          )}
        </Form.Group>
        
        <small>You must press confirm to be removed from our mailing list.</small><br />

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
          <Button onClick={handleSubmit} variant="primary">
            Confirm
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default UnSubscribePage;
