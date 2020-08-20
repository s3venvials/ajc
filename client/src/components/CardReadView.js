import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Jumbotron, Row, Col, Image } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import Playground from './Playground';
import Rating from './Rating';
import Comments from './Comments';

const CardReadView = (props) => {
    const [read, setRead] = useState([]);
    const id = window.location.pathname.split("/")[2];

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
    }, [id]);

    return (
        <Container>
            <Jumbotron style={{ borderBottomLeftRadius: "25px", borderBottomRightRadius: "25px"}}>
                {read.map((item, index) => {
                    return (
                        <div key={index}>
                            <h1 style={{ textAlign: 'center' }}>{item.title}</h1>

                            <p>
                                {item.subTitle}
                            </p>
                        </div>
                    )
                })}
            </Jumbotron>

            {read.map((item, index) => {
                return (
                    <div key={index}>
                        <Row>
                            <Col lg={12}>
                                {item.imageUrl ?
                                    <Image fluid src={`${item.imageUrl}`} alt="comic-strip" />
                                    :
                                    <Image fluid src={`${item.imgPath}`} alt="comic-strip" />
                                }

                            </Col>
                        </Row>

                        {
                            ReactHtmlParser(item.content)
                        }
                    </div>
                )
            })}

            <Playground />
            <Rating />
            <Comments />
        </Container >
    )
}

export default CardReadView;
