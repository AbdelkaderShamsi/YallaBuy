import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Rating from "../screens/Rating";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../actions/wishlistActions";
import "../index.css";

function Product({ product }) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const toggleWishlist = () => {
    setActive(!active);
    dispatch(addToWishlist(product));
  };

  return (
    <Card className="my-3 p-3 rounded shadow-sm product-card">
      <div onClick={toggleWishlist}>
        <FaHeart size={18} color={active ? "#e63946" : "#aaa"} />
      </div>

      <Link to={`/product/${product.id || product._id}`}>
        <Card.Img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <Card.Body>
        <Link
          to={`/product/${product.id || product._id}`}
          className="text-dark text-decoration-none"
        >
          <Card.Title as="h5" className="mb-3 text-truncate">
            {product.name}
          </Card.Title>
        </Link>

        <div className="d-flex align-items-center mb-2">
          <Rating value={product.rating} color="#f8e825" />
        </div>

        <div className="ms-2 text-muted">{product.numReviews} reviews</div>

        <Card.Text
          as="h4"
          className="fw-bold mb-2"
          style={{ color: "#184F38" }}
        >
          EGP {product.price}
        </Card.Text>

        {product.description && (
          <Card.Text className="text-muted small">
            {product.description.substring(0, 50)}...
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
