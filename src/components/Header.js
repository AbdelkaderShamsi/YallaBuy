// import React, { useEffect } from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../actions/userActions";
// import { FaShoppingCart, FaHeart, FaBook } from "react-icons/fa";
// import SearchBox from "./SearchBox";
// import { clearAutoLogout, resetAutoLogout } from "../utils/AutoLogout";

// function Header() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

//   useEffect(() => {
//     if (userInfo) {
//       const events = [
//         "mousedown",
//         "mousemove",
//         "keypress",
//         "scroll",
//         "touchstart",
//       ];

//       const resetTimer = () => {
//         resetAutoLogout(dispatch, navigate);
//       };

//       events.forEach((event) => {
//         document.addEventListener(event, resetTimer);
//       });

//       resetAutoLogout(dispatch, navigate);

//       return () => {
//         events.forEach((event) => {
//           document.removeEventListener(event, resetTimer);
//         });
//       };
//     }
//   }, [userInfo, dispatch, navigate]);

//   const logoutHandler = () => {
//     if (typeof clearAutoLogout === "function") {
//       clearAutoLogout();
//     }
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <Navbar expand="sm" className="navbar navbar-custom fixed-top">
//       <Container fluid>
//         <Navbar.Brand as={Link} to="/home" style={{ position: "relative" }}>
//           <img
//             src="/media/basket1.jpg"
//             alt="logo"
//             style={{
//               height: "120px",
//               width: "120px",
//               objectFit: "contain",
//               position: "absolute",
//               top: "100%",
//               left: "0",
//               transform: "translateY(-45%)",
//             }}
//           />
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll" className="w-100 d-flex">
//           <div
//             className="d-flex mx-auto"
//             style={{ maxWidth: "600px", flex: 1 }}
//           >
//             <SearchBox />
//           </div>

//           <Nav
//             className="ms-auto d-flex align-items-start"
//             style={{ gap: "15px", marginTop: "5px" }}
//           >
//             <Nav.Link as={Link} to="/cart" className="position-relative">
//               <FaShoppingCart size={20} /> Cart
//               {cartCount > 0 && (
//                 <span
//                   className="position-absolute top-0 start-100 translate-middle"
//                   style={{
//                     backgroundColor: "#d4f70fff",
//                     color: "#184F38",
//                     borderRadius: "50%",
//                     padding: "2px 7px",
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     boxShadow: "0 0 5px rgba(0,0,0,0.2)",
//                   }}
//                 >
//                   {cartCount}
//                 </span>
//               )}
//             </Nav.Link>

//             <Nav.Link as={Link} to="/orders">
//               <FaBook /> Orders
//             </Nav.Link>

//             <Nav.Link as={Link} to="/wishlist">
//               <FaHeart /> Wishlist
//             </Nav.Link>

//             {userInfo ? (
//               <NavDropdown
//                 title={`Welcome ${userInfo.first_name}`}
//                 id="userMenu"
//               >
//                 <NavDropdown.Item as={Link} to="/profile">
//                   Profile
//                 </NavDropdown.Item>
//                 <NavDropdown.Item onClick={logoutHandler}>
//                   Logout
//                 </NavDropdown.Item>
//               </NavDropdown>
//             ) : (
//               <NavDropdown title="Account" id="navbarScrollingDropdown">
//                 <NavDropdown.Item as={Link} to="/login">
//                   Sign in
//                 </NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/signup">
//                   Sign up
//                 </NavDropdown.Item>
//               </NavDropdown>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header;

import React, { useEffect, useState } from "react";
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
import "../Header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const [showCategory, setShowCategory] = useState(true);

  // Auto logout events
  useEffect(() => {
    if (userInfo) {
      const events = [
        "mousedown",
        "mousemove",
        "keypress",
        "scroll",
        "touchstart",
      ];
      const resetTimer = () => resetAutoLogout(dispatch, navigate);
      events.forEach((e) => document.addEventListener(e, resetTimer));
      resetAutoLogout(dispatch, navigate);
      return () =>
        events.forEach((e) => document.removeEventListener(e, resetTimer));
    }
  }, [userInfo, dispatch, navigate]);

  // Hide Category on Scroll Down
  useEffect(() => {
    let prevScroll = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > prevScroll) {
        setShowCategory(false); // Scroll down
      } else {
        setShowCategory(true); // Scroll up
      }
      prevScroll = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = () => {
    if (typeof clearAutoLogout === "function") clearAutoLogout();
    dispatch(logout());
    navigate("/login");
  };

  const categories = [
    "Mobiles",
    "Fashion",
    "Appliances",
    "Super Market",
    "Beauty",
    "Baby",
  ];

  return (
    <>
      {/* MAIN NAVBAR */}
      <Navbar expand="lg" className="navbar navbar-custom fixed-top">
        <Container
          fluid
          className="d-flex align-items-start justify-content-between"
        >
          {/* LEFT: LOGO */}
          <Navbar.Brand as={Link} to="/home" style={{ position: "relative" }}>
            <img
              src="/media/basket1.jpg"
              alt="logo"
              style={{
                height: "100px",
                width: "120px",
                objectFit: "contain",
                position: "absolute",
                top: "45px",
                left: "10px",
                transform: "translateY(-45%)",
              }}
            />
          </Navbar.Brand>

          {/* MIDDLE: SEARCH */}
          <div className="search-box-container flex-grow-1 mx-3">
            <SearchBox />
          </div>

          {/* RIGHT: ICONS */}
          <Nav
            className="ms-auto d-flex align-items-start"
          >
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <FaShoppingCart size={20} /> Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
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
        </Container>
      </Navbar>

      {/* CATEGORY BAR */}
      {showCategory && (
        <div
          className="category-nav fixed-top"
          style={{
            backgroundColor: "#184f38",
            padding: "8px 0",
            top: "85px", // بعد Navbar
            zIndex: 1000,
            transition: "top 0.3s ease",
          }}
        >
          <Container fluid>
            <Nav className="justify-content-center">
              {categories.map((cat, i) => (
                <Nav.Item key={i}>
                  <Nav.Link
                    as={Link}
                    to={`/products?category=${cat}`}
                    style={{ fontWeight: "500", padding: "0 15px" }}
                  >
                    {cat}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Container>
        </div>
      )}
    </>
  );
}

export default Header;
