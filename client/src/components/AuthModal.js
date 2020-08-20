import React, { useState } from 'react';
import axios from "axios";
import { Button, Modal, Nav, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';

const AuthModal = () => {
    const [show, setShow] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMsgs, setErrMsgs] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const radios = [
        { name: 'Log In', icon: <i className="fas fa-sign-in-alt"></i>, value: '1' },
        { name: 'Sign Up', icon: <i className="fas fa-user-plus"></i>, value: '2' }
    ];

    const signUp = async (e) => {
        try {
            e.preventDefault();
            let flag = true;
            let data = { firstName, lastName, email, confirmEmail, password, confirmPassword };

            for (const [key, value] of Object.entries(data)) {
                if (!value) { 
                    setErrMsgs(errMsgs.concat(`${key} is a required field`));
                    flag = false;
                }
            }

            if (email !== confirmEmail) { 
                console.log("Emails do not match!"); 
                flag = false;
            }

            if (password !== confirmPassword) {
                console.log("Passwords do not match!"); 
                flag = false;
            }
            
            if (flag) {
                console.log(data);
                // let res = await axios.post("/api/user/signup", state);
            }
        } catch (error){
            console.log(error);
        }
    }

    const loginFields = [
        {
            id: "formBasicUsername",
            label: "Email address",
            type: "email",
            placeHolder: "Enter Email"
        },
        {
            controlId: "formBasicPassword",
            label: "Password",
            type: "password",
            placeHolder: "Password"
        }
    ];

    const signupFields = [
        {
            id: "formBasicFirstName",
            label: "First Name",
            type: "text",
            placeHolder: "First Name",
            value: firstName,
            onChange: (e) => setFirstName(e.target.value)
        },
        {
            id: "formBasicLastName",
            label: "Last Name",
            type: "text",
            placeHolder: "Last Name",
            value: lastName,
            onChange: (e) => setLastName(e.target.value)
        },
        {
            id: "formBasicEmail",
            label: "Email address",
            type: "email",
            placeHolder: "Enter Email",
            value: email,
            onChange: (e) => setEmail(e.target.value)
        },
        {
            id: "formBasicConfirmEmail",
            label: "Confirm Email address",
            type: "email",
            placeHolder: "Confirm Email",
            value: confirmEmail,
            onChange: (e) => setConfirmEmail(e.target.value)
        },
        {
            id: "formBasicPassword",
            label: "Password",
            type: "password",
            placeHolder: "Enter Password",
            value: password,
            onChange: (e) => setPassword(e.target.value)
        },
        {
            id: "formBasicConfirmPassword",
            label: "Confirm Password",
            type: "password",
            placeHolder: "Confirm Password",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value)
        }
    ];

    return (
        <>
            <Nav.Link onClick={handleShow}>
                <i className="fas fa-user-circle"></i> Log In/Sign Up
            </Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <ButtonGroup toggle>
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    variant="primary"
                                    key={idx}
                                    type="radio"
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    {radio.icon} {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {radioValue === '1' ?
                            <>
                                {loginFields.map((item, index) => {
                                    return (
                                        <Form.Group key={index} controlId={item.id}>
                                            <Form.Label>{item.label}</Form.Label>
                                            <Form.Control type={item.type} placeholder={item.placeHolder} />
                                        </Form.Group>
                                    )
                                })}

                                <Form.Group>
                                    <a href="/forgot_password">Forgot Password</a>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Log In
                                </Button>
                            </>
                            :
                            <>
                                {signupFields.map((item) => {
                                    return (
                                        <Form.Group key={item.id} controlId={item.id}>
                                            <Form.Label>{item.label}</Form.Label>
                                            <Form.Control type={item.type} value={item.value} onChange={item.onChange} placeholder={item.placeHolder} />
                                        </Form.Group>
                                    )
                                })}

                                <Button variant="primary" type="submit" onClick={signUp}>
                                    Sign Up
                                </Button>
                            </>
                        }
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AuthModal;