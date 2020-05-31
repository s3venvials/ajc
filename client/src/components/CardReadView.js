import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Jumbotron } from 'react-bootstrap';
const id = window.location.pathname.split("/")[2];

const CardReadView = () => {
    const [read, setRead] = useState([]);

    useEffect(() => {
        let getRead = async id => {
            try {
                let res = await axios.get(`/api/reads/one?id=${id}`);
                setRead([...res.data]);
            } catch (error) {
                console.log(error);
            }
        }
        getRead(id);
    }, []);

    return (
        <Container>
            <Jumbotron>
                {read.map((item, index) => {
                    return (
                        <div key={index}>
                            <h1>{item.title}</h1>
                        </div>
                    )
                })}
               
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
            </Jumbotron>

            {read.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item.content}</p>
                        </div>
                    )
                })}
        </Container>
    )
}

export default CardReadView;
