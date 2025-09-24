import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Message from "..//screens/Message";
import "../index.css";
import { validPassword } from "./Regex";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { PulseLoader } from "react-spinners";

function LoginScreen() {
  const [email, setEmail] = useState("");

  const [password1, setPassword1] = useState("");

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password1));
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={2}></Col>
          <Col xs={8}>
            {loading ? (
              <PulseLoader color="#184F38" margin={5} speedMultiplier={0.5} />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Card>
                <Card.Header
                  as="h2"
                  className="text-center text-light p-3"
                  style={{ backgroundColor: "#184F38" }}
                >
                  login
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>
                        <i className="fa-solid fa-envelope"></i> Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ height: "55px", borderRadius: "50px" }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>
                        <i className="fa-solid fa-lock"></i> Password
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password1}
                          onChange={(e) => setPassword1(e.target.value)}
                          required
                          style={{
                            height: "55px",
                            borderRadius: "50px 0 0 50px",
                          }}
                        />
                        <InputGroup.Text
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            cursor: "pointer",
                            borderRadius: "0 50px 50px 0",
                            background: "white",
                          }}
                        >
                          <i
                            className={`fa-solid ${
                              showPassword ? "fa-eye" : "fa-eye-slash"
                            }`}
                          ></i>
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-md p-2 text-light border rounded-pill fs-4 "
                        type="submit"
                        style={{ backgroundColor: "#184F38" }}
                      >
                        Sign In
                      </button>
                    </div>
                  </Form>

                  <Row className="py-3">
                    <Col>
                      <span>New User !</span>
                      <Link to={"/signup"} className="ms-2">
                        Sign Up
                      </Link>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
