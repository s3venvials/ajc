import React, { useEffect, useState } from 'react';
import AuthModal from './AuthModal';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { history } from "../helpers";

const Header = () => {
    const [signedIn, setIsSignedIn] = useState(false);
    const [displayName, setDisplayName] = useState("");

    const isAuthed = (isAuth) => { setIsSignedIn(isAuth) };

    useEffect(() => {
        let getUser = async () => {
            try {
                if (localStorage.sessionId) {
                    let res = await axios.get(`/api/user/current?sessionId=${localStorage.sessionId}`, { withCredentials: true });
                    if (res.data.User) {
                        setIsSignedIn(true);
                        setDisplayName(`Hello, ${res.data.User[0].firstName} ${res.data.User[0].lastName}`);
                    }
                }
            } catch (error) {
                setIsSignedIn(false);
                console.log(error);
            }
        }
        getUser();
    }, [signedIn, displayName]);

    const signOut = async () => {
        try {
            await axios.get(`/api/user/signout?sessionId=${localStorage.sessionId}`, { withCredentials: true });
            setIsSignedIn(false);
            localStorage.clear();
        } catch (error) {
            setIsSignedIn(false);
            console.log(error);
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
                            <AuthModal isLoggedIn={isAuthed}/>
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;