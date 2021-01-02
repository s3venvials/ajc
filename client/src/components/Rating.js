import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
const id = window.location.pathname.split("/")[2];

const Rating = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [favorited, setFavorited] = useState(0);
  const [shares, setShares] = useState(0);

  useEffect(() => {
    if (props.ratings) {
      const { likes, dislikes, favorited, shares } = props.ratings;
      setLikes(likes);
      setDislikes(dislikes);
      setFavorited(favorited);
      setShares(shares);
    }
    return;
  }, [props.ratings]);

  const updateRatings = (value) => props.updateRatings(value);

  const handleSubmit = async (event, value) => {
    try {
      event.preventDefault();

      await axios.post(
        "/api/reads/ratings",
        { id, value },
        { withCredentials: true }
      );

      updateRatings(true);
    } catch (error) {}
  };

  const btns = [
    {
      title: "like",
      variant: "outline-primary",
      icon: <i className="far fa-thumbs-up fa-2x"></i>,
      value: likes,
      name: "likes",
      onClick: (e) => handleSubmit(e, { likes: likes + 1 }),
    },
    {
      title: "dislike",
      variant: "outline-secondary",
      icon: <i className="far fa-thumbs-down fa-2x"></i>,
      value: dislikes,
      name: "dislikes",
      onClick: (e) => handleSubmit(e, { dislikes: dislikes + 1 }),
    },
    {
      title: "love",
      variant: "outline-danger",
      icon: <i className="far fa-heart fa-2x"></i>,
      value: favorited,
      name: "favorited",
      onClick: (e) => handleSubmit(e, { favorited: favorited + 1 }),
    },
    {
      title: "share",
      variant: "outline-info",
      icon: <i className="fas fa-share fa-2x"></i>,
      value: shares,
      name: "shares",
      onClick: (e) => handleSubmit(e, { shares: shares + 1 }),
    },
  ];

  return (
    <Row>
      {btns.map((item, index) => {
        return (
          <Col key={index} xs={3} lg={1} title={item.title}>
            <Button
              onClick={item.onClick}
              variant={item.variant}
              style={{ border: "none" }}
            >
              {item.icon} {item.value}
            </Button>
          </Col>
        );
      })}
    </Row>
  );
};

export default Rating;
