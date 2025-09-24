import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../index.css";

function OurStory() {
  return (
    <Container className="py-4">
      <div className="story-title">
        <h1 className="m-0">Our Story</h1>
      </div>
      <Row>
        <Col md={12}>
          <div className="story-box">
            <h5>
              At YallaBuy, our journey began with a simple idea: to make
              shopping easier, faster, and more reliable for everyone. We
              noticed how overwhelming online shopping can be—countless
              platforms, endless searches, and sometimes disappointing results.
              That’s when we decided to create a space that brings everything
              together in one trusted place. YallaBuy was born out of a passion
              for convenience and choice. Our platform is designed to connect
              people with the products they love—whether it’s cars, phones,
              watches, or accessories—without the stress of complicated browsing
              or unreliable sellers. We wanted to build more than just an
              e-commerce website; we wanted to create a community where trust,
              quality, and accessibility come first. The name YallaBuy reflects
              our vision: quick, hassle-free shopping that fits right into your
              lifestyle. “Yalla” means “let’s go”, and that’s exactly what we’re
              about—getting you what you need, when you need it. Every feature
              on our platform, from easy navigation to secure payments, was
              built with one goal in mind: to make online shopping a better
              experience for you. We’re constantly growing, adding new
              categories and products, and improving our services to meet your
              needs. This is just the beginning of our story. With your support,
              YallaBuy will continue to evolve into a platform that not only
              sells products but also builds trust, simplifies choices, and
              brings joy to everyday shopping. Welcome to YallaBuy—where
              shopping starts with trust and ends with satisfaction.
            </h5>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OurStory;
