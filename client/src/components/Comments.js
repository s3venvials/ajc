import React from 'react';
import { Form, Button } from "react-bootstrap";

const Comments = () => {
    return (
        <Form style={{ marginTop: "1em" }}>

            <Form.Group controlId="commentForm.ControlTextarea">
                <Form.Label>
                    <strong>
                        <i className="far fa-comment"></i> Leave a comment
                    </strong>
                </Form.Label>
                <Form.Control as="textarea" rows="3" />
            </Form.Group>

            <Button>Submit</Button>
        </Form>
    )
}

export default Comments;