import React, { useState } from "react";
import CardReads from "./CardReads";
import { Container, Form, Button, Image } from "react-bootstrap";

const Reads = () => {
  const [searchValue, setValue] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <div>
      <Container>
        <Image
          src="https://res.cloudinary.com/frontndev/image/upload/c_scale,h_350,w_1200/v1606435368/glenn-carstens-peters-npxXWgQ33ZQ-unsplash_zyhvc9.jpg"
          fluid
        />
        <span>
          Credit: {" "}
          Photo by{" "}
          <a href="https://unsplash.com/@glenncarstenspeters?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Glenn Carstens-Peters
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/work?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
      </Container>

      <Container style={{ paddingBottom: "75px", marginTop: "2em" }}>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>
              <h4>Search Reads</h4>
            </Form.Label>
            <Form.Control
              size="lg"
              type="text"
              value={searchValue}
              placeholder="Search by title or hashtag e.g. #Test"
              onChange={handleChange}
            />
            {searchValue && (
              <Button
                style={{ marginTop: "0.5em" }}
                onClick={() => setValue("")}
                variant="outline-danger"
              >
                <i className="fas fa-times-circle"></i> Clear
              </Button>
            )}
          </Form.Group>
        </Form>

        <CardReads postCount={100} size={12} searchValue={searchValue} />
      </Container>
    </div>
  );
};

export default Reads;
