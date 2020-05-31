import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

const CardReads = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let getAllReads = async () => {
            try {
                let res = await axios.post("/api/reads/count", { postCount: props.postCount, isRandom: props.isRandom });
                setData([...res.data]);
            } catch (error) {
                console.log(error);
            }
        }
        getAllReads();
    }, [props.postCount, props.isRandom]);

    if (data.length !== 0) {
        return (
            <Row>
                {data.map((item, index) => {
                    return (
                        <Col key={index} lg={4} style={{ marginBottom: '1em' }}>
                            <Card style={{ width: '18rem' }}>
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                <Card.Body>
                                    {item.title ?
                                        <Card.Title>{item.title}</Card.Title>
                                        :
                                        <Card.Title>Title Not Available</Card.Title>
                                    }
                                    
                                    <Card.Text>
                                        {`${item.content.slice(0, 100)}...`}
                                    </Card.Text>
                                    <a href={`/reads/${item._id}/${item.title}`} variant="primary">Read More</a>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
                }
            </Row>
        )
    } else {
        return null;
    }
}

export default CardReads;