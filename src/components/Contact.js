import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../index.css";

function Contact() {
  return (
    <Container className="py-4">
      
      <div className="contact-title">
        <h1 className="m-0">CONTACT US</h1>
      </div>

      
      <Row className="g-4">
        <Col xs={12}>
          <div className="contact-box">
            <h5>
              <i className="fa-solid fa-envelope"></i> | support@yallabuy.com
            </h5>
          </div>
        </Col>

        <Col xs={12}>
          <div className="contact-box">
            <h5>
              <i className="fa-solid fa-phone"></i> | (+20) 123 456 7890
            </h5>
          </div>
        </Col>

        <Col xs={12}>
          <div className="contact-box">
            <h5>
              <i className="fa-solid fa-bullhorn"></i> | ads@yallabuy.com
            </h5>
          </div>
        </Col>

        <Col xs={12}>
          <div className="contact-box">
            <h5>
              <i className="fa-solid fa-location-dot"></i> | Cairo, Egypt
            </h5>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
