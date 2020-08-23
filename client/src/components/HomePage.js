import React, { useState, Fragment } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import CardReads from './CardReads';
import Image from 'react-bootstrap/Image';

const HomePage = () => {
    const [postCount, setPostCount] = useState(3);
    const [isRandom, setisRandom] = useState(0);

    const handleChange = (event) => {
        setisRandom(0);
        setPostCount(event.target.value);
    }

    return (
        <Fragment>
            <Container fluid style={{ padding: '0' }}>
                <Jumbotron style={{ backgroundColor: '#f5f5f5', borderRadius: '0' }}>
                    <Container>
                        <Row>
                            <Col lg={6} sm={12}>
                                <h2>Welcome To Average Joe Coding!</h2>
                                <h5>
                                    Hello and welcome to my space in the
                                    virtual world! AJC is a space where I share my insights and
                                    expereinces with programming in a light hearted way!
                                </h5>
                                <br />
                                <h6 style={{ opacity: '0.5' }}>"Learning how to code for humans."</h6>
                                <p style={{ opacity: '0.5', paddingLeft: '3em' }}>- AJC</p>

                                <Image style={{ border: 'none', backgroundColor: '#f5f5f5' }} src="https://res.cloudinary.com/frontndev/image/upload/c_scale,h_250,w_425/v1594492723/ajc-bc_jcv3eo.png" alt="ajc" thumbnail />
                            </Col>
                            <Col lg={6} sm={12}>
                                <div>
                                    <h4>Follow Us!</h4>
                                    <a href="https://twitter.com/averagejoecodi1" title="Twitter" target="_blank" rel="noopener noreferrer" style={{ fontSize: "24pt" }}><i className="fab fa-twitter"></i></a>
                                    <Form>
                                        <Form.Group controlId="email">
                                            <Form.Label><h5>Subscribe</h5></Form.Label>
                                            <Form.Control type="email" name="email" placeholder="Enter Email" />
                                        </Form.Group>
                                        <Button variant="primary"><i className="far fa-paper-plane"> Submit</i></Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </Container>

            <Container>

                <Col lg={12} style={{ textAlign: 'center' }}>
                    <hr />
                        <h3>Random Reads</h3>
                    <hr />
                </Col>

                <Row>
                    <Col lg={3}>
                        <Form.Group controlId="random">
                            <Form.Label><h5>Pick A Number</h5></Form.Label>
                            <Form.Control type="number" placeholder="Pick a number" name="postCount" value={postCount} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col lg={3}>
                        <Form.Group controlId="randomBtn">
                            <Form.Label><h5>Feeling Lucky Punk?</h5></Form.Label>
                            <Form><Button onClick={() => { setisRandom(isRandom + 1); setPostCount(""); }} >Make My Day</Button></Form>
                        </Form.Group>
                    </Col>
                </Row>

                <CardReads postCount={postCount} isRandom={isRandom} size={4} />
            </Container>
        </Fragment>
    )
}

export default HomePage;