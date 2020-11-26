import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ConfirmPassCode = (props) => {
    const [passCode, setPassCode] = useState("");
    const [resMsg, setResMsg] = useState("");

    const sendPassCodeConfirm = (value) => props.receivePassCodeConfirm(value);

    const handleSubmit = async event => {
        try {
            setResMsg("");
            event.preventDefault();
            let res = await axios.post("/api/user/verify_email", { passCode }, { withCredentials: true });
            if (res.data.Message) {
                sendPassCodeConfirm(false);
            } else {
                setResMsg(res.data.Error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            {resMsg && <Alert variant="danger">{resMsg}</Alert>}
            <Form.Group>
                <Form.Label>Confirm Pass Code</Form.Label>
                <Form.Control type="text" value={passCode} name="passCode" onChange={(event) => setPassCode(event.target.value)} />
            </Form.Group>

            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default ConfirmPassCode;