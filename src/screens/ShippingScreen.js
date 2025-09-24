import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart) || {};
  const shippingAddress = cart.shippingAddress || {};

  const [city, setCity] = useState(shippingAddress.city || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [district, setDistrict] = useState(shippingAddress.district || "");
  const [street, setStreet] = useState(shippingAddress.street || "");
  const [buildingNumber, setBuildingNumber] = useState(
    shippingAddress.buildingNumber || ""
  );
  const [floor, setFloor] = useState(shippingAddress.floor || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=shipping");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        district,
        street,
        buildingNumber,
        floor,
      })
    );
    navigate("/Payment");
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
        <h1 className="m-0">Shipping</h1>
      </div>
      <div className="cart-item cart-item-row">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="city" className="my-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="district" className="my-3">
            <Form.Label>District</Form.Label>
            <Form.Control
              type="text"
              placeholder="District"
              value={district}
              required
              onChange={(e) => setDistrict(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="street" className="my-3">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="street"
              value={street}
              required
              onChange={(e) => setStreet(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="address" className="my-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="buildingNumber" className="my-3">
            <Form.Label>Building No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="building No."
              value={buildingNumber}
              required
              onChange={(e) => setBuildingNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="floor" className="my-3">
            <Form.Label>Floor</Form.Label>
            <Form.Control
              type="text"
              placeholder="floor"
              value={floor}
              required
              onChange={(e) => setFloor(e.target.value)}
            />
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

export default ShippingScreen;
