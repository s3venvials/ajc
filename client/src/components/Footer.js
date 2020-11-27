import React from "react";
import { Navbar, Container } from "react-bootstrap";

const footerStyle = {
  position: "static",
  left: 0,
  bottom: 0,
  height: "60px",
  marginTop: "2em",
};

const Footer = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom">
      <Navbar.Text>All Rights Reserved AJC 2020</Navbar.Text>
    </Navbar>
  );
};

export default Footer;
