import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
  Button,
  Alert,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";
import { PulseLoader } from "react-spinners";

function OrderScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    console.log("Order data:", order);
  }, [order]);

  const getStatusText = (order) => {
    if (order.status === "delivered") return "Delivered";
    if (order.status === "rejected") return "Rejected";
    if (order.isPaid) return "Paid - Processing";
    return "Pending Payment";
  };

  const getStatusColor = (order) => {
    if (order.status === "delivered") return "success";
    if (order.status === "rejected") return "danger";
    if (order.isPaid) return "info";
    return "warning";
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="d-flex justify-content-center my-5">
          <PulseLoader color="#184F38" margin={5} speedMultiplier={0.5} />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate("/orders")} className="btn btn-success">
          Back to Orders
        </Button>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-4">
        <div className="d-flex flex-column align-items-center justify-content-center my-5">
          <h4 className="text-muted mb-3">Order not found</h4>
          <Button
            onClick={() => navigate("/orders/")}
            className="btn btn-success"
          >
            Back to Orders
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="mx-auto mb-4 text-center">
        <h1 style={{ color: "#184F38" }}>Order #{order.id}</h1>
        <span className={`badge bg-${getStatusColor(order)}`}>
          {getStatusText(order)}
        </span>
      </div>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h4>Shipping Information</h4>
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Name:</strong> {order.user?.first_name}{" "}
                {order.user?.last_name}
              </p>
              <p>
                <strong>Email:</strong> {order.user?.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress?.address},{" "}
                {order.shippingAddress?.city}, {order.shippingAddress?.district}
              </p>
              <p>
                <strong>Street:</strong> {order.shippingAddress?.street},
                Building {order.shippingAddress?.buildingNumber}, Floor{" "}
                {order.shippingAddress?.floor}
              </p>

              {order.isDelivered ? (
                <p className="text-success">
                  <strong>Delivered on:</strong>{" "}
                  {new Date(order.deliveredAt).toLocaleDateString()}
                </p>
              ) : (
                <p className="text-warning">Not yet delivered</p>
              )}
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header>
              <h4>Order Items</h4>
            </Card.Header>
            <Card.Body>
              {order.orderItems?.map((item, index) => (
                <Row key={index} className="align-items-center mb-3">
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <Link
                      to={`/product/${item.product}`}
                      className="text-decoration-none"
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>
                    <span className="fw-bold">{item.qty}</span> x
                  </Col>
                  <Col md={2} className="text-success">
                    EGP {item.price}
                  </Col>
                  <Col md={2} className="text-end">
                    EGP {(item.qty * item.price).toFixed(2)}
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header>
              <h4>Order Summary</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Items:</span>
                  <span>EGP {order.itemsPrice}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Shipping:</span>
                  <span>EGP {order.shippingPrice}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Tax:</span>
                  <span>EGP {order.taxPrice}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span className="text-success">EGP {order.totalPrice}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mt-3">
            <Card.Header>
              <h4>Payment Information</h4>
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <p className="text-success">
                  <strong>Paid on:</strong>{" "}
                  {new Date(order.paidAt).toLocaleDateString()}
                </p>
              ) : (
                <p className="text-warning">Pending payment</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderScreen;
