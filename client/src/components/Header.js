import React, { useEffect, useState } from 'react';
import AuthModal from './AuthModal';
import { Navbar, Nav, Container, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { history } from "../helpers";

const Header = () => {
    const [signedIn, setIsSignedIn] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [spinner, showSpinner] = useState(false);

    const isSignedIn = (isAuth) => setIsSignedIn(isAuth);

    useEffect(() => {
        let getUser = async () => {
            try {
                let res = await axios.get(`/api/user/current?sessionId=${sessionStorage.sessionId}`, { withCredentials: true });
              
                if (res.data.User) {
                    setDisplayName(`Hello, ${res.data.User[0].firstName} ${res.data.User[0].lastName}`);
                    setIsSignedIn(true);
                }
            } catch (error) {
                console.log(error);
                setIsSignedIn(false);
            }
        }

        getUser();

        return () => {
            if (sessionStorage.sessionId) {
                getUser();
            }
        }
    });

    const signOut = async () => {
        try {
            showSpinner(true);
            await axios.get(`/api/user/signout?sessionId=${sessionStorage.sessionId}`, { withCredentials: true });
            setIsSignedIn(false);
            setDisplayName("");
            sessionStorage.clear();
            setInterval(() => {
                showSpinner(false);
            }, 1600);
        } catch (error) {
            setIsSignedIn(false);

        }
    }
    
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={() => history.push("/")}>AJC</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
                        <Nav.Link onClick={() => history.push("/reads")}>Reads</Nav.Link>
                        <Nav.Link onClick={() => history.push("/donate")}>Donate</Nav.Link>
                        <Nav.Link onClick={() => history.push("/shop")}>Shop</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            signedIn ?
                                <>
                                    <Nav.Link href="/">{displayName}</Nav.Link>
                                    <Button onClick={signOut} size="sm" variant="outline-light"><i className="fas fa-sign-out-alt"></i> Sign Out</Button>
                                </>

                                :

                                spinner ?
                                    <Button variant="outline-light"><Spinner animation="border" size="sm" role="status"></Spinner> Signing Out...</Button>
                                    :
                                    <AuthModal isAuthorized={isSignedIn} />
                                
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;