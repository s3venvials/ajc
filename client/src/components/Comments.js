import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import moment from "moment";
import CommentRating from "./CommentRating";
import axios from "axios";

const Comments = (props) => {
  const id = window.location.pathname.split("/")[2];
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [alertMsg, setAlert] = useState("");

  useEffect(() => {
    if (props.comments) setComments([...props.comments]);
  }, [props.comments]);

  const updateComments = (value) => props.updateComments(value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!message || message === " " || message.length < 10) {
        return;
      }

      const res = await axios.post("/api/reads/comments", {
        id,
        name: name ? name : "Anonymous",
        message,
        createdDate: moment(Date.now()),
      });

      if (res.data) {
        updateComments(true);
        setComments([...res.data.comments]);
        setName("");
        setMessage("");
        setAlert("Comment was successfully added!");
        setTimeout(() => {
          setAlert("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form style={{ marginTop: "1em" }} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>
            <strong>First Name</strong>
          </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="commentForm.ControlTextarea">
          <Form.Label>
            <strong>
              <i className="far fa-comment"></i> Leave a comment
            </strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>

      {alertMsg && (
        <Alert variant="success" style={{ marginTop: "1em" }}>
          {alertMsg}
        </Alert>
      )}

      {comments.map((item, index) => {
        return (
          <Card key={index} style={{ marginTop: "1em" }}>
            <Card.Header>
              <Row>
                <Col lg={6} xs={7}>
                  <i
                    className="far fa-user-circle fa-lg"
                    style={{ float: "left", margin: "0.2em" }}
                  ></i>{" "}
                  <h5>{item.name}</h5>
                </Col>
                <Col lg={6} xs={5}>
                  <span style={{ float: "right" }}>{item.createdDate}</span>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>{item.message}</Card.Body>
            <Card.Footer>
              <CommentRating />
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
};

export default Comments;
