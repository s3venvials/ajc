import React, { useState } from 'react';
import CardReads from './CardReads';
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';

const Reads = () => {
    const [searchValue, setValue] = useState("");

    const handleChange = event => {
        const { value } = event.target;
        setValue(value);
    }   

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
                        <Form.Control size="lg" type="text" value={searchValue} placeholder="Search by title or hashtag e.g. #Test" onChange={handleChange} />
                        {searchValue && 
                            <Button 
                                style={{ marginTop: '0.5em' }}
                                onClick={() => setValue("")}
                                variant="outline-danger"
                                >
                                <i className="fas fa-times-circle"></i> Clear
                            </Button>
                        }
                    </Form.Group>
                </Form>

                <CardReads postCount={100} size={12} searchValue={searchValue} />
            </Container>
        </div>
    );
}

export default Reads;