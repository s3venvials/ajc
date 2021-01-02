import React, { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line
import { Container, Jumbotron, Row, Col, Image, Media, Form } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import Playground from "./Playground";
import Rating from "./Rating";
import Comments from "./Comments";

const CardReadView = (props) => {
  const [read, setRead] = useState([]);
  const id = window.location.pathname.split("/")[2];
  const [code, setCode] = useState("");
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(false);

  const getRatingsUpdate = (value) => setUpdate(value);
  const getCommentsUpdate = (value) => setUpdate(value);

  useEffect(() => {
    const getRead = async (id) => {
      try {
        const res = await axios.get(`/api/reads/one?id=${id}`);
        const read = res.data[0];

        setRead([...res.data]);
        setCode(read.code);

        const { likes, dislikes, favorited, shares, comments } = read;

        setRatings({ likes, dislikes, favorited, shares });
        setComments([...comments]);
        
        setUpdate(false);
      } catch (error) {}
    };
    getRead(id);
  }, [id, update]);

  return (
    <Container style={{ paddingBottom: "75px" }}>
      <Jumbotron
        className="ReadsJumboTron"
        style={{
          borderBottomRightRadius: "25px",
          borderBottomLeftRadius: "25px",
        }}
      >
        {read.map((item, index) => {
          return (
            <div key={index}>
              <h1 style={{ textAlign: "center", color: "orangered" }}>
                {item.title}
              </h1>

              <p>{item.subTitle}</p>
            </div>
          );
        })}
      </Jumbotron>

      {read.map((item, index) => {
        return (
          <div key={index}>
            <Row>
              <Col lg={12}>
                {item.imageUrl ? (
                  <Image fluid src={`${item.imageUrl}`} alt="comic-strip" />
                ) : (
                  <Image fluid src={`${item.imgPath}`} alt="comic-strip" />
                )}
              </Col>
            </Row>

            {ReactHtmlParser(item.content)}
            
            {code &&  
              <>
              <h5>Try it Your Self!</h5>
              <p>Copy or manually write the code below!</p>

              <Form>
                <Form.Group>
                  <Form.Control as="textarea" rows={10} readOnly value={code} />
                </Form.Group>
              </Form> 
              </>
            }
           
          </div>
        );
      })}

      <Playground code={code} />
      <Rating ratings={ratings} updateRatings={getRatingsUpdate} size={1}/>
      <Comments comments={comments} updateComments={getCommentsUpdate} />
    </Container>
  );
};

export default CardReadView;
