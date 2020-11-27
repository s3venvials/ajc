import React from "react";
import { Container, Button, Image } from "react-bootstrap";

const DonatePage = () => {
  return (
    <Container>
      <h3 style={{ marginTop: "2em" }}>Help Support My Passion</h3>

      <Image
        src="https://res.cloudinary.com/frontndev/image/upload/c_scale,h_300,w_1102/v1606434907/simon-abrams-k_T9Zj3SE8k-unsplash_e8rfh7.jpg"
        fluid
      />

      
      <span>
        Credit:{" "}
        Photo by{" "}
        <a href="https://unsplash.com/@flysi3000?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Simon Abrams
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/work?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Unsplash
        </a>
      </span>

      <div style={{ border: "1px solid #EEE", marginTop: "1em" }}>
        <div style={{ padding: "1em" }}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <Button variant="primary">Donate With PayPal</Button>
        </div>
      </div>
    </Container>
  );
};

export default DonatePage;
