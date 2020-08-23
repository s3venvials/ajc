import React from 'react';
import CardReads from './CardReads';
import { Container, Jumbotron, Form } from 'react-bootstrap';

const Reads = () => {
    return (
        <div>
            <Jumbotron fluid style={{ textAlign: 'center' }}>
                <Container>
                    <h1>Reads</h1>
                </Container>
            </Jumbotron>

            <Container>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label><h4>Search Reads</h4></Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Search by title or hashtag..." />
                    </Form.Group>
                </Form>

                <CardReads postCount={100} size={12} />
            </Container>
        </div>
    );
}

export default Reads;