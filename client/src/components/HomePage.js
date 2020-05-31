import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import CardReads from './CardReads';
// import LearnCards from './LearnCards';

const styles = () => {
    return {
        root: {
            backgroundImage: 'url("https://res.cloudinary.com/frontndev/image/upload/c_scale,h_350,q_auto:best,w_600/v1590360607/ajc_ud2rkr.png")',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#FFFFFF',
            backgroundSize: '100%'
        }
    }
}

const HomePage = () => {
    const classes = styles();
    const [postCount, setPostCount] = useState(3);
    const [isRandom, setisRandom] = useState(0);

    const handleChange = (event) => {
        setisRandom(0);
        setPostCount(event.target.value);
    }

    return (
        <Container>
            <Jumbotron style={{ backgroundColor: "#FFFFFF" }}>
                <Row>
                    <Col lg={4} sm={12}>
                        <h2>Welcome To Average Joe Coding!</h2>
                        <p>
                            Hello my name is Mark, and welcome to my space in the
                            virtual world! AJC is a space where I share my insights and 
                            expereinces with programming, but in a light hearted way!
                        </p>
                        <div>
                            <h4>Follow Us!</h4>
                            <a href="/" title="Twitter" target="_blank" style={{ fontSize: "24pt"}}><i className="fab fa-twitter"></i></a>
                            <a href="/" title="YouTube" target="_blank" style={{ fontSize: "24pt", color: 'red', marginLeft: '0.5em' }}><i className="fab fa-youtube"></i></a>
                            <Form>
                                <Form.Group controlId="email">
                                    <Form.Label><h5>Subscribe</h5></Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Enter Email" />
                                </Form.Group>
                                <Button variant="primary"><i className="far fa-paper-plane"> Submit</i></Button>
                            </Form>
                        </div>
                    </Col>
                    <Col style={classes.root} lg={8} sm={12}></Col>
                </Row>
            </Jumbotron>

            <hr />

            <Col lg={12} style={{ textAlign: 'center' }}>
                <h3>Random Reads</h3>
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

            <CardReads postCount={postCount} isRandom={isRandom} />

            {/* <hr /> */}

            {/* <Col lg={12} style={{ textAlign: 'center' }}>
                <h3>You Gonna Learn Today</h3>
            </Col> */}

            {/* <LearnCards /> */}
        </Container>
    )
}

export default HomePage;