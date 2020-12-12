import React from "react";
import { Container, Button, Image, Row, Col } from "react-bootstrap";
import { history } from "../helpers";

const DonatePage = () => {
  return (
    <Container style={{ marginBottom: "75px" }}>
      <h3 style={{ marginTop: "1em" }}>Help Support My Passion</h3>

      <Image
        src="https://res.cloudinary.com/frontndev/image/upload/c_scale,h_300,w_1102/v1606434907/simon-abrams-k_T9Zj3SE8k-unsplash_e8rfh7.jpg"
        fluid
      />

      <span>
        Credit: Photo by{" "}
        <a href="https://unsplash.com/@flysi3000?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Simon Abrams
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/work?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Unsplash
        </a>
      </span>

      <Row>
        <Col lg={6}>
          <div style={{ borderRight: "1px solid #EEE", marginTop: "0.5em" }}>
            <div style={{ padding: "0.5em" }}>
              <h5>One Time Donation</h5>
              <p>
                AJC is a one-man show, and if you would like to make an
                unobligated donation it is tremendously appreciated! Please only
                donate if you truly feel it is deserved based on the content
                I've provided. Donations help keep this site running and it
                honestly gives me the drive to continue to grow this content.
              </p>

              <Button variant="primary">Donate With PayPal</Button>
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <div style={{ marginTop: "0.5em" }}>
            <div style={{ padding: "0.5em" }}>
              <h5>Other ways to Support</h5>
              <p>
                Head on over to the shop page where I've added products and
                services through affiliate marketing. Buy from trusted companies
                at no additional cost, and by doing so it provides me with a
                commission and you get a product you want, it's a win-win!.
              </p>

              <Button variant="success" onClick={() => history.push("/shop")}>Go To Shop</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DonatePage;
