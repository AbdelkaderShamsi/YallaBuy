import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Message from "./Message";
import { removeFromWishlist } from "../actions/wishlistActions";
import { addToCart } from "../actions/cartActions";

function WishlistScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <Container className="py-4">
      <div
        className="mx-auto mb-4 text-center d-flex align-items-center justify-content-center"
        style={{
          height: "50px",
          width: "300px",
          backgroundColor: "#184F38",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <h1 className="m-0">My Wishlist</h1>
      </div>

      <Row className="justify-content-center">
        <Col md={8}>
          {wishlistItems.length === 0 ? (
            <div className="text-center mt-5">
              <img
                src="/media/emptyImg.jpg"
                alt="Empty Wishlist"
                style={{ width: "200px", opacity: 0.7 }}
              />
              <h4 className="mt-3 text-muted">No items in wishlist</h4>
              <Link to="/" className="btn btn-success mt-3">
                Go Shopping
              </Link>
            </div>
          ) : (
            <ListGroup variant="flush">
              {wishlistItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2} className="text-success fw-bold">
                      EGP {item.price}
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeFromWishlistHandler(item.product)}
                      >
                        <FaTrash style={{ color: "red" }} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h4 className="text-center mb-3">
              Wishlist Total: {wishlistItems.length} item
              {wishlistItems.length > 1 && "s"}
            </h4>
            <Button
              type="button"
              className="w-100"
              style={{
                backgroundColor: "#184F38",
                borderColor: "#184F38",
                fontSize: "18px",
              }}
              disabled={wishlistItems.length === 0}
              onClick={() => {
                wishlistItems.forEach((item) => {
                  dispatch(addToCart(item.product, 1));
                });
                navigate("/cart");
              }}
            >
              Move All To Cart
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default WishlistScreen;
