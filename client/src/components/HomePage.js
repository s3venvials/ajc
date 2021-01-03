import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CardReads from "./CardReads";
import Image from "react-bootstrap/Image";
import SubscribePopover from "./SubscribePopover";
import ConfirmPassCode from "./ConfirmPassCode";

const HomePage = (props) => {
  const [postCount, setPostCount] = useState(3);
  const [isRandom, setisRandom] = useState(0);
  const [email, setEmail] = useState("");
  const [resMsg, setResMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [spinner, showSpinner] = useState(false);
  const [showPassCodeField, setPassCodeField] = useState(false);

  const handleChange = (event) => {
    setisRandom(0);
    setPostCount(event.target.value);
  };

  useEffect(() => {
    let timeOut;
    if (successMsg) {
      timeOut = setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    }

    return () => clearTimeout(timeOut);
  });

  const handleSub = async (e) => {
    try {
      setPassCodeField(false);
      e.preventDefault();
      setResMsg("");
      if (!email) return;
      showSpinner(true);

      let res = await axios.post(
        "/api/user/subscribe",
        { email },
        { withCredentials: true }
      );

      if (!res.data.isSubscribed) {
        setTimeout(() => {
          setEmail("");
          setResMsg(res.data.Message);
          showSpinner(false);
          setPassCodeField(true);
        }, 600);
      } else {
        showSpinner(false);
        setResMsg(res.data.Message);
      }
    } catch (error) {
      setResMsg("");
      showSpinner(false);
    }
  };

  const receivePassCodeConfirmation = (value) => {
    setPassCodeField(value.showPassCodeField);
    setResMsg("");
    setSuccessMsg(value.Message);
  };

  return (
    <>
      <Container fluid style={{ padding: "0" }}>
        <Jumbotron style={{ backgroundColor: "#FFF", borderRadius: "0" }}>
          <Container>
            <Row>
              <Col lg={6} sm={12}>
                <h2>Welcome To Average Joe Coding!</h2>
                <h5>
                  Hello and welcome to my space in the virtual world! AJC is a
                  space where I share my insights and expereinces with
                  programming in a light hearted way!
                </h5>
                <br />
                <h6 style={{ opacity: "0.5" }}>
                  "Learning how to code for humans."
                </h6>
                <p style={{ opacity: "0.5", paddingLeft: "3em" }}>- AJC</p>

                <Image
                  style={{ border: "none" }}
                  src="https://res.cloudinary.com/frontndev/image/upload/c_scale,h_250,w_425/v1609613062/ajc_white_bg_kssl4h.png"
                  alt="ajc"
                  thumbnail
                />
              </Col>
              <Col lg={6} sm={12}>
                <div>
                  <h4>Follow Us!</h4>

                  <small>Discuss related topics or just reach out to say hi!</small>
                  <br />

                  <a
                    href="https://twitter.com/averagejoecodi1"
                    title="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "24pt" }}
                  >
                    <i className="fab fa-twitter"></i>
                  </a>

                  {resMsg && (
                    <Alert variant="info">
                      {" "}
                      <i className="fas fa-info-circle"></i> {resMsg}
                    </Alert>
                  )}

                  {successMsg && (
                    <Alert variant="success">
                      {" "}
                      <i className="fas fa-check"></i> {successMsg}
                    </Alert>
                  )}

                  {showPassCodeField ? (
                    <ConfirmPassCode
                      receivePassCodeConfirm={receivePassCodeConfirmation}
                    />
                  ) : (
                    <>
                      <Row style={{ marginTop: "3em" }}>
                        <Col xl={2} lg={3} xs={3}>
                          <Form.Label>
                            <h5>Subscribe</h5>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={4}>
                          <SubscribePopover />
                        </Col>
                      </Row>
                      <Form onSubmit={handleSub}>
                        <Form.Group controlId="email">
                          <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                          />
                        </Form.Group>
                        {spinner ? (
                          <Button>
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                              as="span"
                            ></Spinner>{" "}
                            Submitting...
                          </Button>
                        ) : (
                          <Button type="submit" variant="primary">
                            <i className="far fa-paper-plane"> Submit</i>
                          </Button>
                        )}
                      </Form>
                    </>
                  )}
                </div>

                {/* <div style={{ marginTop: "3em" }}>
                    <h5>Topics consist of...</h5>
                </div> */}
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </Container>

      <Container style={{ paddingBottom: "75px" }}>
        <Col lg={12} style={{ textAlign: "center" }}>
          {/* <hr /> */}
          <h2>Reads</h2>
          <a style={{ marginBottom: "1em" }} href="/reads">View All Reads</a>
          {/* <hr /> */}
        </Col>

        <Row>
          <Col lg={3}>
            <Form.Group controlId="random">
              <Form.Label>
                <h5>Pick A Number</h5>
                <small>Change the number of reads to display.</small>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Pick a number"
                name="postCount"
                value={postCount}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group controlId="randomBtn">
              <Form.Label>
                <h5>Feeling Lucky Punk?</h5>
                <small>Returns a random read.</small>
              </Form.Label>
              <Form>
                <Button
                  onClick={() => {
                    setisRandom(isRandom + 1);
                    setPostCount("");
                  }}
                >
                  Make My Day
                </Button>
              </Form>
            </Form.Group>
          </Col>
        </Row>

        <CardReads
          postCount={postCount}
          isRandom={isRandom}
          size={4}
          searchValue={[]}
        />
      </Container>
    </>
  );
};

export default HomePage;
