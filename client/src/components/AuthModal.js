import React, { useState } from 'react';
import axios from "axios";
import { Button, Modal, Nav, Form, ButtonGroup, ToggleButton, Alert, Spinner } from 'react-bootstrap';

const AuthModal = (props) => {
    const [show, setShow] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMsg, setErrMsg] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [spinner, showSpinner] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(true);

    const handleClose = () => { 
        setErrMsg("");
        setSuccessMsg("");
        showSpinner(false);
        setShow(false);
     }
    const handleShow = () => setShow(true);

    const radios = [
        { name: 'Log In', icon: <i className="fas fa-sign-in-alt"></i>, value: '1' },
        { name: 'Sign Up', icon: <i className="fas fa-user-plus"></i>, value: '2' }
    ];

    const signUp = async (e) => {
        try {
            setErrMsg("");
            setSuccessMsg("");
            e.preventDefault();
            showSpinner(true);
            let data = { firstName, lastName, email, confirmEmail, password, confirmPassword, isSubscribed };
            let res = await axios.post("/api/user/signup", data);
            if (res.data.Message) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setConfirmEmail("");
                setPassword("");
                setConfirmPassword("");
                setRadioValue("1");
                setIsSubscribed(true);
                setTimeout(() => { 
                    setSuccessMsg(res.data.Message);
                    showSpinner(false) 
                }, 1500);
            } else {
                showSpinner(false);
                setErrMsg(res.data.Error);
            }
        } catch (error) {
            setErrMsg(error);
        }
    }

    const isSignedIn = (isAuth) => props.isAuthorized(isAuth);

    const signIn = async (e) => {
        try {
            setErrMsg("");
            setSuccessMsg("");
            e.preventDefault();
            showSpinner(true);

            let data = { username, password: pass };
            let res = await axios.post("/api/user/signin", data, { withCredentials: true });
           
            if (res.data.User) {
                setUsername("");
                setPass("");
                sessionStorage.setItem("sessionId", res.data.SessionId);
                showSpinner(false);
                setShow(false);
                isSignedIn(true);
            } else {
                showSpinner(false);
                setErrMsg(res.data.Error);
            }
        } catch (error) {
            console.log(error)
            setErrMsg(error);
        }
    }

    const loginFields = [
        {
            id: "formBasicUsername",
            label: "Email address",
            type: "email",
            placeHolder: "Enter Email",
            value: username,
            onChange: (e) => setUsername(e.target.value)
        },
        {
            controlId: "formBasicPassword",
            label: "Password",
            type: "password",
            placeHolder: "Enter Password",
            value: pass,
            onChange: (e) => setPass(e.target.value)
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
        },
        {
            id: "formBasicSubcribCheckBox",
            label: "Subscribe",
            type: "checkbox",
            checked: isSubscribed,
            onChange: (e) => setIsSubscribed(e.target.checked)
        }
    ];

    return (
        <>
            <Nav.Link onClick={handleShow}>
                <i className="fas fa-user-circle"></i> Log In/Sign Up
                </Nav.Link>

            <Modal show={show} onHide={handleClose}>
                {successMsg && <Alert variant="success"><i className="fas fa-check-circle"></i> {successMsg}</Alert>}
                {errMsg.length ? <Alert variant="danger"><i className="fas fa-times-circle"></i> {errMsg}</Alert> : null}
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
                    <Form onSubmit={radioValue === '1' ? signIn : signUp}>
                        {spinner ?
                            <Spinner animation="grow" variant="primary" />
                            :
                            radioValue === '1' ?
                                <>
                                    {loginFields.map((item, index) => {
                                        return (
                                            <Form.Group key={index} controlId={item.id}>
                                                <Form.Label>{item.label}</Form.Label>
                                                <Form.Control type={item.type} value={item.value} onChange={item.onChange} placeholder={item.placeHolder} />
                                            </Form.Group>
                                        )
                                    })}

                                    <Form.Group>
                                        <a href="/forgot_password">Forgot Password</a>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" onClick={signIn}>
                                        Log In
                                    </Button>
                                </>
                                :
                                <>
                                    {signupFields.map((item) => {
                                        return (
                                            <Form.Group key={item.id} controlId={item.id}>
                                                {item.type === "checkbox" ?
                                                    <Form.Check type={item.type} label={item.label} checked={item.checked} onChange={item.onChange} />
                                                :
                                                <>
                                                    <Form.Label>{item.label}</Form.Label>
                                                    <Form.Control type={item.type} value={item.value} onChange={item.onChange} placeholder={item.placeHolder} />
                                                </>
                                                }
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