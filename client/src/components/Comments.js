import React from 'react';
import { Card, Row, Col } from "react-bootstrap";
import moment from 'moment';
import CommentRating from "./CommentRating";

let date = moment(Date.now());

let comments = [
    {
        name: "Mark",
        date: date.format('LLL'),
        message: "From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage."
    },
    {
        name: "Pete",
        date: date.format('LLL'),
        message: "Great read!"
    },
    {
        name: "Sara",
        date: date.format('LLL'),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

const Comments = () => {
    return (
        <div>
            {
                comments.map((item, index) => {
                    return (
                        <Card style={{ marginTop: "1em" }}>
                            <Card.Header>
                                <Row>
                                    <Col lg={6} xs={7}>                                      
                                        <i className="far fa-user-circle fa-lg" style={{ float: 'left', margin: '0.2em' }}></i> <h5>{item.name}</h5> 
                                    </Col>
                                    <Col lg={6} xs={5}>
                                        <span style={{ float: 'right' }}>{item.date}</span>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                {item.message}
                            </Card.Body>
                            <Card.Footer>
                                <CommentRating />
                            </Card.Footer>
                        </Card>
                    )
                })

            }
        </div>

    )
}

export default Comments;