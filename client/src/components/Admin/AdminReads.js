import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const AdminReads = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleChange = event => {
        const { name, value } = event.target;
        if (name === "title") setTitle(value);
        if (name === "content") setContent(value);
    }

    const handleSubmit = async event => {

        event.preventDefault();
        try {
            await axios.post("/api/reads/new", { title, content }, { withCredentials: true });
            setTitle("");
            setContent("");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container style={{ marginTop: '2em' }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={title} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows="10" name="content" value={content} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AdminReads;