import React, { useState } from 'react';
import axios from "axios";
import { Button, Modal, Nav, Form, ButtonGroup, ToggleButton, Alert, Spinner, Row, Col } from 'react-bootstrap';
import SubscribePopover from "./SubscribePopover";

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
    const [signinSpinner, showSigninSpinner] = useState(false);
    const [signupSpinner, showSignupSpinner] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(true);
    const [verifyLink, showVerifyLink] = useState(false);
    const [verifyLinkSuccess, showVerifyLinkSuccess] = useState(false);
    const [loginValidated, setLoginValidated] = useState(false);
    const [signupValidated, setSignupValidated] = useState(false);

    const handleClose = () => {
        setErrMsg("");
        setSuccessMsg("");
        showSignupSpinner(false);
        showSigninSpinner(false);
        setShow(false);
        showVerifyLink(false);
        showVerifyLinkSuccess(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setConfirmEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsSubscribed(true);
        setUsername("");
        setPass("");
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
            setSignupValidated(true);
            showSignupSpinner(true);
            showVerifyLink(false);
            showVerifyLinkSuccess(false);

            if (!firstName || !lastName || !email || !confirmEmail || !password || !confirmPassword) {
                showSignupSpinner(false);
                return;
            }

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(email)) {
                showSignupSpinner(false);
                alert("Invalid email");
                setSignupValidated(false);
                return;
            }

            let data = { firstName, lastName, email, confirmEmail, password, confirmPassword, isSubscribed };
            let res = await axios.post("/api/user/signup", data);
            if (res.data.Message) {
                setTimeout(() => {
                    setSuccessMsg(res.data.Message);
                    showSignupSpinner(false);
                    setRadioValue("1");
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setConfirmEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setIsSubscribed(true);
                }, 1500);
            } else {
                showSignupSpinner(false);
                setErrMsg(res.data.Error);
                setSignupValidated(false);
            }
        } catch (error) {
            showSignupSpinner(false);
            setErrMsg(error);
            setSignupValidated(false);
        }
    }

    const isSignedIn = (isAuth) => props.isAuthorized(isAuth);

    const signIn = async (e) => {
        try {
            e.preventDefault();
            setLoginValidated(true);
            setErrMsg("");
            setSuccessMsg("");
            showSigninSpinner(true);
            showVerifyLink(false);
            showVerifyLinkSuccess(false);

            if (!username || !pass) {
                showSigninSpinner(false);
                return;
            }

            let data = { username, password: pass };
            let res = await axios.post("/api/user/signin", data, { withCredentials: true });
            if (res.data.User) {
                setUsername("");
                setPass("");
                sessionStorage.setItem("sessionId", res.data.SessionId);
                showSigninSpinner(false);
                setShow(false);
                isSignedIn(true);
            } else {
                showSigninSpinner(false);
                if (!res.data.Error) {
                    showVerifyLink(true);
                } else {
                    setLoginValidated(false);
                    setErrMsg(res.data.Error);
                }

            }
        } catch (error) {
            showSigninSpinner(false);
            setErrMsg(error);
            setLoginValidated(false);
        }
    }

    const loginFields = [
        {
            id: "formBasicUsername",
            label: "Email address",
            type: "email",
            placeHolder: "Enter Email",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            invalid: "Please provide a username."
        },
        {
            controlId: "formBasicPassword",
            label: "Password",
            type: "password",
            placeHolder: "Enter Password",
            value: pass,
            onChange: (e) => setPass(e.target.value),
            invalid: "Please provide a password."
        }
    ];

    const signupFields = [
        {
            id: "formBasicFirstName",
            label: "First Name",
            type: "text",
            placeHolder: "First Name",
            value: firstName,
            onChange: (e) => setFirstName(e.target.value),
            invalid: "Please provide a first name."
        },
        {
            id: "formBasicLastName",
            label: "Last Name",
            type: "text",
            placeHolder: "Last Name",
            value: lastName,
            onChange: (e) => setLastName(e.target.value),
            invalid: "Please provide a last name."
        },
        {
            id: "formBasicEmail",
            label: "Email address",
            type: "email",
            placeHolder: "Enter Email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            invalid: "Missing or invalid email."
        },
        {
            id: "formBasicConfirmEmail",
            label: "Confirm Email address",
            type: "email",
            placeHolder: "Confirm Email",
            value: confirmEmail,
            onChange: (e) => setConfirmEmail(e.target.value),
            invalid: "Missing or invalid email."
        },
        {
            id: "formBasicPassword",
            label: "Password",
            type: "password",
            placeHolder: "Enter Password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            invalid: "Please provide a password."
        },
        {
            id: "formBasicConfirmPassword",
            label: "Confirm Password",
            type: "password",
            placeHolder: "Confirm Password",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            invalid: "Please confirm your password."
        },
        {
            id: "formBasicSubcribCheckBox",
            label: "Subscribe",
            type: "checkbox",
            checked: isSubscribed,
            onChange: (e) => setIsSubscribed(e.target.checked),
            addOn: <SubscribePopover />
        }
    ];

    const sendVerifyEmail = async () => {
        try {
            showVerifyLink(false);
            let res = await axios.post("/api/user/email_verification", { email: username }, { withCredentials: true });
            if (res.data === "Done") showVerifyLinkSuccess(true);
        } catch (error) {
            showVerifyLinkSuccess(false);
        }
    }

    return (
        <>
            <Nav.Link onClick={handleShow}>
                <i className="fas fa-user-circle"></i> Log In/Sign Up
                </Nav.Link>

            <Modal show={show} onHide={handleClose}>
                {successMsg && <Alert variant="success"><i className="fas fa-check-circle"></i> {successMsg}</Alert>}
                {verifyLinkSuccess && <Alert variant="success"><i className="fas fa-check-circle"></i> Email verification was successfully sent to {username}.</Alert>}
                {errMsg.length ? <Alert variant="danger"><i className="fas fa-times-circle"></i> {errMsg}</Alert> : null}
                {verifyLink && <Alert variant="info"> <i className="fas fa-info-circle"></i> Email has not been verified.
                    <Button size="sm" variant="primary" onClick={sendVerifyEmail}> Send Email Verification</Button> to {username}
                </Alert>}
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
                    <Form noValidate validated={radioValue === '1' ? loginValidated : signupValidated} onSubmit={radioValue === '1' ? signIn : signUp}>
                        {radioValue === '1' ?
                            <>
                                {loginFields.map((item, index) => {
                                    return (
                                        <Form.Group key={index} controlId={item.id}>
                                            <Form.Label>{item.label}</Form.Label>
                                            <Form.Control type={item.type} value={item.value} onChange={item.onChange} placeholder={item.placeHolder} required />
                                            <Form.Control.Feedback type="invalid">
                                                {item.invalid}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    )
                                })}

                                <Form.Group>
                                    <a href="/forgot_password">Forgot Password</a>
                                </Form.Group>

                                {signinSpinner ?
                                    <Button variant="primary"><Spinner size="sm" animation="border"></Spinner> Logging In...</Button>
                                    :
                                    <Button variant="primary" type="submit" onClick={signIn}>Log In</Button>
                                }

                            </>
                            :
                            <>
                                {signupFields.map((item) => {
                                    return (
                                        <Form.Group key={item.id} controlId={item.id}>
                                            {item.type === "checkbox" ?
                                                <Row>
                                                    <Col lg={3} xs={3}><Form.Check type={item.type} label={item.label} checked={item.checked} onChange={item.onChange} /></Col>
                                                    <Col lg={6} xs={4}>{item.addOn}</Col>
                                                </Row>

                                                :
                                                <>
                                                    <Form.Label>{item.label}</Form.Label>
                                                    <Form.Control type={item.type} value={item.value} onChange={item.onChange} placeholder={item.placeHolder} required />
                                                    <Form.Control.Feedback type="invalid">
                                                        {item.invalid}
                                                    </Form.Control.Feedback>
                                                </>
                                            }
                                        </Form.Group>
                                    )
                                })}

                                {signupSpinner ?
                                    <Button variant="primary"><Spinner size="sm" animation="border"></Spinner> Signing Up...</Button>
                                    :
                                    <Button variant="primary" type="submit" onClick={signUp}>Sign Up</Button>
                                }

                            </>
                        }
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AuthModal;