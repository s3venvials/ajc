import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Jumbotron, Row, Col, Image } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
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
                        {item.imgPath &&
                            <Row>
                                <Col lg={12}>
                                    <Image fluid src={`${item.imgPath}`} alt="comic-strip" />
                                </Col>
                            </Row>
                        }

                        {
                            ReactHtmlParser(item.content)
                        }
                    </div>
                )
            })}
        </Container>
    )
}

export default CardReadView;
