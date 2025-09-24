import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/Shipping");
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("CashOnDelivery");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    dispatch(
      getOrderDetails({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: cart.cartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        ),
        shippingPrice: 0,
        totalPrice: cart.cartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        ),
      })
    );

    navigate("/PlaceOrder");
  };

  return (
    <Container className="py-4 ">
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
        <h1 className="m-0">Payment Method</h1>
      </div>
      <div className="cart-item cart-item-row">
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="Cash On Delivery"
                id="CashOnDelivery"
                name="paymentMethod"
                value="CashOnDelivery"
                checked={paymentMethod === "CashOnDelivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button
            type="submit"
            className="mx-auto mb-4 text-center d-flex align-items-center justify-content-center"
            style={{
              height: "50px",
              width: "100px",
              backgroundColor: "#184F38",
              borderRadius: "10px",
              fontSize: "20px",
              color: "white",
            }}
          >
            Continue
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default PaymentScreen;
