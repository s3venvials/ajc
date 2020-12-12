import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Row, Col, Spinner } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ReactHtmlParser from "react-html-parser";

const CardReads = (props) => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    let getAllReads = async () => {
      try {
        let res = await axios.post("/api/reads/count", {
          postCount: props.postCount,
          isRandom: props.isRandom,
        });
        if (res.data) setData([...res.data]);
      } catch {}
    };
    getAllReads();
  }, [props.postCount, props.isRandom, update]);

  if (props.searchValue) {
  }
  useEffect(() => {
    setUpdate(false);
    let searchByHashtag = false;
    let filteredList = [];

    if (props.searchValue.length) {
      if (props.searchValue[0] === "#") searchByHashtag = true;

      if (searchByHashtag) {
        data.map((item) =>
          item.category.map((tag) => {
            if (tag.toLowerCase().includes(props.searchValue.toLowerCase()))
              filteredList.push(item);
            return tag;
          })
        );
      } else {
        filteredList = data.filter((item) =>
          item.title.toLowerCase().includes(props.searchValue.toLowerCase())
        );
      }
    }

    if (filteredList.length > 0) setData(filteredList);

    if (props.searchValue !== "" && filteredList.length === 0)
      filteredList = [];

    if (props.searchValue.length === 0) {
      filteredList = [];
      setUpdate(true);
    }
    // eslint-disable-next-line
  }, [props.searchValue, update]);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowSpinner(false);
    }, 5000);

    if (data.length) {
      clearTimeout(loaderTimeout);
      setShowSpinner(false);
    }
  }, [data]);

  if (data.length !== 0) {
    return (
      <Row>
        {data.map((item, index) => {
          return (
            <Col key={index} lg={props.size} style={{ marginBottom: "1em" }}>
              <Card style={{ backgroundColor: "#eaeaea" }}>
                <Card.Body>
                  {item.title ? (
                    <Card.Title>{item.title}</Card.Title>
                  ) : (
                    <Card.Title>Title Not Available</Card.Title>
                  )}
                  <hr />

                  {item.category.map((item, index) => {
                    return (
                      <Badge key={index} pill variant="info">
                        {item}
                      </Badge>
                    );
                  })}

                  <div>
                    {ReactHtmlParser(`${item.content.slice(0, 100)}...`)}
                  </div>
                  <Button
                    onClick={() =>
                      (window.location = `/reads/${item._id}/${item.title}`)
                    }
                    variant="primary"
                    size="sm"
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  } else {
    return (
      <>
        {showSpinner ? (
          <Spinner animation="border" />
        ) : (
          "No reads could be found."
        )}
      </>
    );
  }
};

export default CardReads;
