import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function CategoryNav() {
  const categories = [
    "Mobiles",
    "Fashion",
    "Appliances",
    "Super Market",
    "Beauty",
    "Baby",
  ];

  return (
    <div
  className="category-nav fixed-top"
  style={{ backgroundColor: "#E0BA95", padding: "8px 0" , marginBottom: "10px" , top: "60px" , zIndex: 1020}}
>
  <Nav className="justify-content-center ">
    {categories.map((cat, i) => (
      <Nav.Item key={i}>
        <Nav.Link
          as={Link}
          to={`/products?category=${cat}`}
          style={{
            fontWeight: "500",
            padding: "0 15px",
          }}
        >
          {cat}
        </Nav.Link>
      </Nav.Item>
    ))}
  </Nav>
</div>

  );
}

export default CategoryNav;
