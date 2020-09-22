import React, { useState, Fragment } from 'react';
import axios from "axios";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import CardReads from './CardReads';
import Image from 'react-bootstrap/Image';
import SubscribePopover from './SubscribePopover';

const HomePage = () => {
    const [postCount, setPostCount] = useState(3);
    const [isRandom, setisRandom] = useState(0);
    const [email, setEmail] = useState("");
    const [resMsg, setResMsg] = useState("");
    const [spinner, showSpinner] = useState(false);

    const handleChange = (event) => {
        setisRandom(0);
        setPostCount(event.target.value);
    }

    const handleSub = async e => {
        try {
            e.preventDefault();
            setResMsg("");
            if (email) showSpinner(true);
            let res = await axios.post("/api/user/subscribe", { email }, { withCredentials: true });
            if (res.data) {
                setTimeout(() => { 
                    setEmail("");
                    setResMsg(res.data.Message);
                    showSpinner(false); 
                }, 600);
            }

        } catch (error){
            setResMsg("");
            showSpinner(false);
        }
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
                                    <Form onSubmit={handleSub}>
                                        <Form.Group controlId="email">
                                            <Row>
                                                <Col xl={2} lg={3} xs={3}><Form.Label><h5>Subscribe</h5></Form.Label></Col>
                                                <Col lg={6} xs={4}><SubscribePopover /></Col>
                                            </Row>
                                            
                                            {resMsg && <Alert variant="info"><i className="fas fa-info-circle"></i> {resMsg}</Alert> }
                                            <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value) } placeholder="Enter Email" />
                                        </Form.Group>
                                        {spinner ?
                                         <Button><Spinner animation="border" size="sm" role="status" as="span"></Spinner> Submitting...</Button>
                                         :
                                         <Button type="submit" variant="primary"><i className="far fa-paper-plane"> Submit</i></Button>
                                        }
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

                <CardReads postCount={postCount} isRandom={isRandom} size={4} searchValue={[]} />
            </Container>
        </Fragment>
    )
}

export default HomePage;