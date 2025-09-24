import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
  Alert,
} from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { createOrder } from "../actions/orderActions";
import { resetShippingAddress } from "../actions/cartActions";

function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate) || {};
  const { order, success, error, loading } = orderCreate;

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  console.log("UserInfo from localStorage:", userInfo);
  const hasToken = userInfo && (userInfo.token || userInfo.access);

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  const itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number((0.14 * itemsPrice).toFixed(2)));
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  const placeOrderHandler = () => {
    if (!hasToken) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    if (!cart.shippingAddress) {
      alert("Please provide a shipping address before placing the order.");
      return;
    }
    if (cart.cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    dispatch(
      createOrder({
        orderItems: cart.cartItems.map((item) => ({
          product: item.product || item.id,
          name: item.name,
          qty: item.qty,
          price: item.price,
          image: item.image,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod || "Cash on Delivery",
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  useEffect(() => {
  if (success && order && order.id) {
    dispatch(resetShippingAddress());
    navigate(`/order/${order.id}`);  
  }
}, [success, navigate, order, dispatch]);

  return (
    <Container className="py-4">
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress
                  ? `${cart.shippingAddress.city}, ${cart.shippingAddress.address}, ${cart.shippingAddress.district}, ${cart.shippingAddress.street} , ${cart.shippingAddress.buildingNumber} ,  ${cart.shippingAddress.floor}`
                  : "N/A"}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {cart.paymentMethod || "N/A"}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col md={2}>
                          <Image
                            src={item.image || "/media/placeholder.jpg"}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>{item.name}</Col>
                        <Col md={4}>
                          {item.qty} x EGP {item.price} = EGP{" "}
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>EGP {itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>EGP {shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>EGP {taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>EGP {totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex flex-column align-items-center">
                {!hasToken && (
                  <Alert variant="warning" className="w-100 text-center">
                    Please login to place an order.
                  </Alert>
                )}

                <Button
                  type="button"
                  className="btn-block mb-2"
                  disabled={cart.cartItems.length === 0 || loading || !hasToken}
                  onClick={placeOrderHandler}
                  style={{ width: "100%" }}
                >
                  {loading ? (
                    <PulseLoader size={8} color="#184F38" />
                  ) : (
                    "Place Order"
                  )}
                </Button>

                {error && (
                  <Alert variant="danger" className="w-100 text-center mt-2">
                    Error: {error}
                  </Alert>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PlaceOrderScreen;
