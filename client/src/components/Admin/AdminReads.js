import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";

const AdminReads = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [code, setCode] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    if (name === "content") setContent(value);
    if (name === "category") setCategory(value);
    if (name === "imageUrl") setImageUrl(value);
    if (name === "code") setCode(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("file", file);
      data.append("title", title);
      data.append("category", category);
      data.append("content", content);
      data.append("imageUrl", imageUrl);
      data.append("code", code);
      let res = await axios.post("/api/reads/new", data, {
        withCredentials: true,
      });

      setTitle("");
      setCategory("");
      setContent("");
      setFile("");
      setName("");

      alert(res.data.message);
    } catch (error) {
      alert(error.toString());
    }
  };

  return (
    <Container style={{ marginTop: "2em", marginBottom: "75px" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={(event) => {
              const { value } = event.target;
              setName(value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image Upload</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
          />
        </Form.Group>
        <Row>
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                name="content"
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group>
              <Form.Label>Preview Content</Form.Label>
              <div
                style={{
                  border: "1px solid #CCC",
                  minHeight: "254px",
                  padding: "0.5em",
                }}
              >
                {ReactHtmlParser(content)}
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>Code</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            name="code"
            value={code}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AdminReads;
