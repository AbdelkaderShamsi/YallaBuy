import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../components/ImageSlider";
import { PulseLoader } from "react-spinners";
import Message from "./Message";
import Reviews from "../components/Reviews";

function HomeScreen() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const categoriesRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    async function showCategory() {
      try {
        setLoading(true);
        const { data } = await axios.get("http://127.0.0.1:8000/");
        setCategory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    showCategory();
  }, []);

  const categories = [
    { name: "Mobiles", img: "/media/mobile.webp" },
    { name: "Fashion", img: "/media/fashion1.jpg" },
    { name: "Appliances", img: "/media/appliances.webp" },
    { name: "Super Market", img: "/media/supermarket1.jpg" },
    { name: "Beauty", img: "/media/beauty.webp" },
    { name: "Baby", img: "/media/baby1.jpg" },
  ];

  return (
    <>
      {loading ? (
        <div className="text-center my-5">
          <PulseLoader color="#184F38" margin={5} speedMultiplier={0.5} />
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <ImageSlider />
        </div>
      )}

      <Container className="my-5" ref={categoriesRef}>
        <div className="categories-container">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center"
            >
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="category-item text-center"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="circle">
                  <img src={cat.img} alt={cat.name} />
                </div>
                <p>{cat.name}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="section-box green text-center">
          <h2 className="mb-3">Welcome to YallaBuy</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto 20px" }}>
            Discover amazing deals and shop your favorite products easily and
            quickly.
          </p>
          <video
            width="70%"
            height="auto"
            controls
            autoPlay
            muted
            playsInline
            style={{
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            <source src="/media/yallabuy_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Container>
      <div className="section-box beige" fluid ref={aboutRef}>
        <Row className="align-items-center">
          <Col md={7}>
            <h1 className="mb-3">About Us</h1>
            <p style={{ fontSize: "20px", lineHeight: "1.8" }}>
              Welcome to our online store! We are dedicated to bringing you a
              wide variety of high-quality products at affordable prices. From
              the latest mobiles, fashionable clothing, and stylish accessories
              to home essentials and electronics, our goal is to make your
              shopping experience simple, enjoyable, and reliable.
              <br />
              With a user-friendly platform, secure payment options, and fast
              delivery, we strive to ensure that every order reaches you with
              care. Whether you’re looking for the newest trends, upgrading your
              gadgets, or finding the perfect gift, we’ve got something for
              everyone.
              <br />
              Thank you for choosing us — your satisfaction and trust are at the
              heart of everything we do.
            </p>
          </Col>
          <Col md={5} className="text-center">
            <img
              src="/media/online_shopping.jpg"
              alt="Online Shopping"
              className="img-fluid rounded-circle"
              style={{ border: "5px solid white" }}
            />
          </Col>
        </Row>
      </div>
      <Container>
        <div>
          <Reviews />
        </div>
      </Container>
    </>
  );
}

export default HomeScreen;
