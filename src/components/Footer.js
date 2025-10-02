import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  const categories = [
    { name: "Mobiles" },
    { name: "Fashion" },
    { name: "Appliances" },
    { name: "Super Market" },
    { name: "Beauty" },
    { name: "Baby" },
  ];

  const our_company = [
    { name: "Our Story", path: "/ourstory" },
    { name: "Contact Us", path: "/contact" },
    { name: "Reviews", path: "/reviews" },
  ];

  const help = [
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/prPolicy" },
    { name: "Return Policy", path: "/returnPolicy" },
  ];
  return (
    <div className="footer-container">
      <div className="text-light py-3">
        <Row>
          <Col md={3} className="text-center">
            <div>
              <img
                src="/media/basket1.jpg"
                alt="logo"
                className="footer-logo"
              />
              <h3>
                <i className="fi fi-tr-phone-call"></i>
                45987
              </h3>
              <p>Building C15 | Abu Rawash | Cairo-Alex Rd | Giza | Egypt</p>
              <h6>
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-x-twitter"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-tiktok"></i>
                <i className="fa-brands fa-youtube"></i>
              </h6>
            </div>
          </Col>

          <Col md={3} className="text-center my-3">
            <h5 style={{ color: "#d3d3d360" }}>Categories</h5>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "25px" }}>
              {categories.map((cat, i) => (
                <li key={i} style={{ marginBottom: "17px" }}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col md={3} className="text-center my-3">
            <h5 style={{ color: "#d3d3d360" }}>About Us</h5>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "25px" }}>
              {our_company.map((our, i) => (
                <li key={i} style={{ marginBottom: "17px" }}>
                  <Link
                    to={our.path}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {our.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col md={3} className="text-center my-3">
            <h5 style={{ color: "#d3d3d360" }}>Help</h5>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "25px" }}>
              {help.map((help, i) => (
                <li key={i} style={{ marginBottom: "17px" }}>
                  <Link
                    to={help.path}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {help.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
