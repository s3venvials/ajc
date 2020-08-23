import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const Rating = () => {
    const btns = [
        {
            title: "like",
            variant: "outline-primary",
            icon: <i className="far fa-thumbs-up fa-lg"></i> 
        },
        {
            title: "dislike",
            variant: "outline-secondary",
            icon: <i className="far fa-thumbs-down fa-lg"></i>
        },
        {
            title: "favorite",
            variant: "outline-danger",
            icon: <i className="far fa-heart fa-lg"></i>
        },
        {
            title: "reply",
            variant: "outline-info",
            icon: <i className="fas fa-reply fa-lg"></i>
        }
    ];

    return (
        <Row>
            {btns.map((item, index) => {
                return (
                    <Col key={index} xs={3} lg={1} title={item.title}>
                        <Button variant={item.variant} style={{ border: 'none' }}>
                            {item.icon}
                        </Button>
                    </Col>
                )
            })}
        </Row>
    )
}

export default Rating;