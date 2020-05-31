import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">AJC</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/reads">Reads</Nav.Link>
                        <Nav.Link href="/donate">Donate</Nav.Link>
                        <Nav.Link href="/donate">Shop</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/signup"><i className="fas fa-sign-in-alt"></i> Sign In</Nav.Link>
                        <Nav.Link href="/signup"><i className="fas fa-sign-out-alt"></i> Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;