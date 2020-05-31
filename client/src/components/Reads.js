import React from 'react';
import CardReads from './CardReads';
import { Container, Jumbotron } from 'react-bootstrap';

const Reads = () => {
    return (
        <div>
            <Jumbotron fluid>
                <Container>
                    <h1>Fluid jumbotron</h1>
                    <p>
                        This is a modified jumbotron that occupies the entire horizontal space of
                        its parent.
                    </p>
                </Container>
            </Jumbotron>

            <Container>
                <CardReads postCount={100} />
            </Container>
        </div>
    );
}

export default Reads;