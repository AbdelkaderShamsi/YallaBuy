import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { FaShoppingCart, FaHeart, FaBook } from "react-icons/fa";
import SearchBox from "./SearchBox";
import { clearAutoLogout, resetAutoLogout } from "../utils/AutoLogout";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

 
  useEffect(() => {
    if (userInfo) {
      const events = [
        "mousedown",
        "mousemove",
        "keypress",
        "scroll",
        "touchstart",
      ];

      const resetTimer = () => {
        resetAutoLogout(dispatch, navigate);
      };

      events.forEach((event) => {
        document.addEventListener(event, resetTimer);
      });

      
      resetAutoLogout(dispatch, navigate);

      return () => {
        events.forEach((event) => {
          document.removeEventListener(event, resetTimer);
        });
      };
    }
  }, [userInfo, dispatch, navigate]);

  const logoutHandler = () => {
  if (typeof clearAutoLogout === 'function') {
    clearAutoLogout();
  }
  dispatch(logout());
  navigate("/login");
};

  return (
    <Navbar
      expand="sm"
      className="navbar navbar-custom fixed-top"
      style={{ backgroundColor: "#184F38" }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" style={{ position: "relative" }}>
          <img
            src="/media/basket1.jpg"
            alt="logo"
            style={{
              height: "320px",
              width: "120px",
              objectFit: "contain",
              position: "absolute",
              top: "100%",
              left: "0",
              transform: "translateY(-45%)",
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="w-100 d-flex">
          <div
            className="d-flex mx-auto"
            style={{ maxWidth: "600px", flex: 1 }}
          >
            <SearchBox />
          </div>

          <Nav
            className="ms-4 d-flex align-items-center"
            style={{ gap: "15px" }}
          >
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <FaShoppingCart size={20} /> Cart
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{
                    backgroundColor: "#d4f70fff",
                    color: "#184F38",
                    borderRadius: "50%",
                    padding: "2px 7px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Nav.Link>

            <Nav.Link as={Link} to="/orders">
              <FaBook /> Orders
            </Nav.Link>

            <Nav.Link as={Link} to="/wishlist">
              <FaHeart /> Wishlist
            </Nav.Link>

            {userInfo ? (
              <NavDropdown
                title={`Welcome ${userInfo.first_name}`}
                id="userMenu"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/login">
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/signup">
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
