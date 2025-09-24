import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Container,
  Button,
} from "react-bootstrap";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { FaTrash } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

function CartScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, loading, error } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate("/login?redirect=shipping");
    } else {
      navigate("/shipping");
    }
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
        <h1 className="m-0">Cart Items</h1>
      </div>

      <Row className="justify-content-center">
        <Col md={8}>
          {loading ? (
            <PulseLoader color="#184F38" margin={5} speedMultiplier={0.5} />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : cartItems.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center my-5">
              <img
                src="/media/cart.jpg"
                alt="Empty Cart"
                style={{
                  width: "400px",
                  height: "auto",
                  opacity: 0.85,
                  marginBottom: "-40px",
                  marginTop: "-130px",
                  marginLeft: "85px",
                }}
              />
              <h4 className="text-muted mb-3" style={{ marginLeft: "80px" }}>
                Nothing in the Cart
              </h4>
              <Link
                to="/"
                className="btn btn-success"
                style={{ marginLeft: "80px" }}
              >
                Back Home
              </Link>
            </div>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className="cart-item">
                  <Row className="align-items-center cart-item-row">
                    <Col md={3} className="cart-item-image-col">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </Col>
                    <Col md={3} className="cart-item-name">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={3} className="cart-item-price text-success">
                      EGP {item.price}
                    </Col>
                    <Col
                      md={2}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Button
                        variant="light"
                        className="px-2"
                        disabled={item.qty <= 1}
                        onClick={() =>
                          dispatch(addToCart(item.product, item.qty - 1))
                        }
                      >
                        −
                      </Button>

                      <span className="mx-2 fw-bold">{item.qty}</span>

                      <Button
                        variant="light"
                        className="px-2"
                        disabled={item.qty >= item.stock}
                        onClick={() =>
                          dispatch(addToCart(item.product, item.qty + 1))
                        }
                      >
                        +
                      </Button>
                    </Col>
                    <Col md={1} className="text-end">
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4} className="d-flex align-items-start">
          <Card className="w-100 shadow-sm">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4 className="mb-3 text-center">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h4>
                <h5 className="text-center text-success">
                  EGP{" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  style={{
                    backgroundColor: "#184F38",
                    borderColor: "#184F38",
                    fontSize: "18px",
                  }}
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CartScreen;
