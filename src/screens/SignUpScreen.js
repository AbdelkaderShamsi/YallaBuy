import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Message from "..//screens/Message";
import "../index.css";
import { validPassword } from "./Regex";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/userActions";

function SignUpScreen() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [terms, setTerms] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;

  useEffect(() => {
    if (userInfo) {
      setMessage(`Welcome, ${userInfo.name}!`);
      setFname("");
      setLname("");
      setEmail("");
      setPhone("");
      setPassword1("");
      setPassword2("");
      setBirthDate("");
      setGender("");
      setTerms(false);

      navigate("/login");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setMessage("Password does not match");
      navigate("/signup");
    } else if (!validPassword.test(password1)) {
      setMessage(
        "Password must contain 8 characters (upper, lower, number and symbol)"
      );
    } else {
      dispatch(
        signup(fname, lname, email, phone, password1, birthdate, gender)
      );
      setMessage("Signup is Success");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={2}></Col>
          <Col xs={8}>
            <Card>
              <Card.Header
                as="h2"
                className="text-center text-light p-3"
                style={{ backgroundColor: "#184F38" }}
              >
                Create a New Account
              </Card.Header>
              <Card.Body>
                {message && <Message variant="danger">{message}</Message>}
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="fname">
                        <Form.Label>
                          <i className="fa fa-user"></i> First Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your First Name"
                          value={fname}
                          onChange={(e) => setFname(e.target.value)}
                          required
                          style={{ height: "55px", borderRadius: "50px" }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="lname">
                        <Form.Label>
                          <i className="fa fa-user"></i> Last Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your Last Name"
                          value={lname}
                          onChange={(e) => setLname(e.target.value)}
                          required
                          style={{ height: "55px", borderRadius: "50px" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

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

                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>
                      <i className="fa-solid fa-phone"></i> Phone Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      style={{ height: "55px", borderRadius: "50px" }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password1">
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

                    <small>
                      Password must include at least [1-9][a-z][A-Z][_$@*!..] &
                      8 Characters
                    </small>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>
                      <i className="fa-solid fa-lock"></i> Confirm Password
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password again"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
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

                  <Form.Group className="mb-3" controlId="birthDate">
                    <Form.Label>
                      <i className="fa-solid fa-calendar-days"></i> Birth Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      required
                      style={{ height: "55px", borderRadius: "50px" }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="gender">
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      value="Male"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      value="Female"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 d-flex align-items-center"
                    controlId="terms"
                  >
                    <Form.Check
                      type="checkbox"
                      id="terms"
                      label={
                        <i>
                          I agree to the{" "}
                          <a
                            href="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Terms & Conditions
                          </a>
                        </i>
                      }
                      name="terms"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-md p-2 text-light border rounded-pill fs-4 "
                      type="submit"
                      style={{ backgroundColor: "#184F38" }}
                    >
                      Sign Up
                    </button>
                  </div>
                </Form>

                <Row className="py-3">
                  <Col>
                    <span>Already a User !</span>
                    <Link to={"/login"} className="ms-2">
                      Login
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUpScreen;
