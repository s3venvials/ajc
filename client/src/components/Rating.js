import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const Rating = () => {
    const btns = [
        {
            title: "like",
            variant: "outline-primary",
            icon: <i className="far fa-thumbs-up fa-2x"></i> 
        },
        {
            title: "dislike",
            variant: "outline-secondary",
            icon: <i className="far fa-thumbs-down fa-2x"></i>
        },
        {
            title: "favorite",
            variant: "outline-danger",
            icon: <i className="far fa-heart fa-2x"></i>
        },
        {
            title: "share",
            variant: "outline-info",
            icon: <i className="fas fa-share fa-2x"></i>
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