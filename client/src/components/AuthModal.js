import React, { useState } from 'react';
import { Button, Modal, Nav, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';

const AuthModal = () => {
    const [show, setShow] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const radios = [
        { name: 'Log In', icon: <i className="fas fa-sign-in-alt"></i>, value: '1' },
        { name: 'Sign Up', icon: <i className="fas fa-user-plus"></i>, value: '2' }
    ];

    const loginFields = [
        {
            id: "formBasicEmail",
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
            placeHolder: "First Name"
        },
        {
            id: "formBasicLastName",
            label: "Last Name",
            type: "text",
            placeHolder: "Last Name"
        },
        {
            id: "formBasicEmail",
            label: "Email address",
            type: "email",
            placeHolder: "Enter Email"
        },
        {
            id: "formBasicConfirmEmail",
            label: "Confirm Email address",
            type: "email",
            placeHolder: "Confirm Email"
        },
        {
            id: "formBasicPassword",
            label: "Password",
            type: "password",
            placeHolder: "Enter Password"
        },
        {
            id: "formBasicConfirmPassword",
            label: "Confirm Password",
            type: "password",
            placeHolder: "Confirm Password"
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
                                {loginFields.map((item) => {
                                    return (
                                        <Form.Group key={item.id} controlId={item.id}>
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
                                            <Form.Control type={item.type} placeholder={item.placeHolder} />
                                        </Form.Group>
                                    )
                                })}

                                <Button variant="primary" type="submit">
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