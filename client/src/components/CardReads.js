import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ReactHtmlParser from 'react-html-parser';
import { history } from "../helpers";

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
                        <Col key={index} lg={props.size} style={{ marginBottom: '1em' }}>
                            <Card style={{ backgroundColor: '#eaeaea' }}>
                                <Card.Body>
                                    {item.title ?
                                        <Card.Title>{item.title}</Card.Title>
                                        :
                                        <Card.Title>Title Not Available</Card.Title>
                                    }
                                    <hr />
                                    
                                    {item.category.map((item, index) => {
                                        return <Badge key={index} pill variant="info">{item}</Badge>
                                    })
                                    }
                                    
                                    <div>
                                    {
                                        ReactHtmlParser(`${item.content.slice(0, 100)}...`)
                                    }
                                    </div>
                                    <Button onClick={() => history.push(`/reads/${item._id}/${item.title}`)} variant="primary" size="sm">Read More</Button>
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