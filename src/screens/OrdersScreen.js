// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Table, Button, Container } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { listMyOrders } from "../actions/orderActions";
// import { PulseLoader } from "react-spinners";
// import Message from "./Message";
// import store from "../Store";

// function OrdersScreen() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const orderListMy = useSelector((state) => state.orderListMy);
//   const loading = orderListMy?.loading || false;
//   const error = orderListMy?.error || null;
//   const orders = orderListMy?.orders || [];

//   useEffect(() => {
//     console.log("Full Redux state:", store.getState());
//   }, [orderListMy]);
//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login?redirect=orders/");
//     } else {
//       dispatch(listMyOrders());
//     }
//   }, [dispatch, navigate, userInfo]);
//   useEffect(() => {
//     console.log("Current orders state:", {
//       orders,
//       ordersLength: orders.length,
//       loading,
//       error,
//     });
//   }, [orders, loading, error]);

//   return (
//     <Container className="py-4">
//       <div
//         className="mx-auto mb-4 text-center d-flex align-items-center justify-content-center"
//         style={{
//           height: "50px",
//           width: "300px",
//           backgroundColor: "#184F38",
//           borderRadius: "10px",
//           color: "white",
//         }}
//       >
//         <h1 className="m-0">My Orders</h1>
//       </div>

//       {orderListMy === undefined ? (
//         <div>Loading initial state...</div>
//       ) : loading ? (
//         <div className="d-flex justify-content-center my-5">
//           <PulseLoader color="#184F38" margin={5} speedMultiplier={0.5} />
//         </div>
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : orders && orders.length === 0 ? (
//         <div className="d-flex flex-column align-items-center justify-content-center my-5">
//           <img
//             src="/media/no_order.jpg"
//             alt="No Orders"
//             style={{
//               width: "400px",
//               height: "auto",
//               opacity: 0.85,
//               marginBottom: "-40px",
//               marginTop: "-130px",
//             }}
//           />
//           <h4 className="text-muted mb-3 mt-4">You have no orders yet</h4>
//           <p className="text-muted mb-4 text-center">
//             Start shopping now and place your first order!
//           </p>
//           <Link to="/">
//             <Button className="btn btn-success px-4 py-2">
//               Continue Shopping
//             </Button>
//           </Link>
//         </div>
//       ) : (
//         <Table
//           striped
//           bordered
//           hover
//           responsive
//           className="table-sm"
//           style={{ border: "2px solid red" }}
//         >
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Date</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td>#{order.id}</td>
//                 <td>{order.createdAt?.substring(0, 10)}</td>
//                 <td>
//                   EGP{" "}
//                   {order.totalPrice
//                     ? Number(order.totalPrice).toFixed(2)
//                     : "0.00"}
//                 </td>
//                 <td>
//                   {order.status === "delivered"
//                     ? "Delivered"
//                     : order.status === "rejected"
//                     ? "Rejected"
//                     : order.isPaid
//                     ? "Paid (Processing)"
//                     : "Pending Payment"}
//                 </td>
//                 <td>
//                   <Link to={`/order/${order.id}`}>
//                     <Button className="btn-sm btn-dark">Details</Button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// }

// export default OrdersScreen;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Container, Card, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { listMyOrders } from "../actions/orderActions";
import { PulseLoader } from "react-spinners";
import Message from "./Message";

function OrdersScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const loading = orderListMy?.loading || false;
  const error = orderListMy?.error || null;
  const orders = orderListMy?.orders || [];

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=orders/");
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, navigate, userInfo]);

  const getStatusVariant = (status, isPaid) => {
    if (status === "delivered") return "success";
    if (status === "rejected") return "danger";
    if (isPaid) return "info";
    return "warning";
  };

  const getStatusText = (status, isPaid) => {
    if (status === "delivered") return "Delivered";
    if (status === "rejected") return "Rejected";
    if (isPaid) return "Paid - Processing";
    return "Pending Payment";
  };

  return (
    <Container className="py-4" style={{ minHeight: "70vh" }}>
      <div className="text-center mb-5">
        <h1
          style={{
            color: "#184F38",
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          My Orders
        </h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>
          Track and manage your orders
        </p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5 py-5">
          <PulseLoader color="#184F38" margin={5} speedMultiplier={0.5} />
        </div>
      ) : error ? (
        <div className="d-flex justify-content-center">
          <div style={{ maxWidth: "500px" }}>
            <Message variant="danger">{error}</Message>
          </div>
        </div>
      ) : orders && orders.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center my-5 py-5">
          <img
            src="/media/no_order.jpg"
            alt="No Orders"
            style={{
              width: "300px",
              height: "auto",
              opacity: 0.85,
              marginBottom: "1rem",
            }}
          />
          <h4 style={{ color: "#184F38", marginBottom: "16px" }}>
            You have no orders yet
          </h4>
          <p
            style={{ color: "#666", marginBottom: "32px", textAlign: "center" }}
          >
            Start shopping now and place your first order!
          </p>
          <Link to="/">
            <Button
              className="px-4 py-2"
              style={{
                backgroundColor: "#184F38",
                borderColor: "#184F38",
                borderRadius: "25px",
                fontSize: "18px",
                padding: "12px 32px",
              }}
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <Card
          className="shadow-sm border-0"
          style={{ borderRadius: "15px", overflow: "hidden" }}
        >
          <Card.Header
            style={{
              backgroundColor: "#184F38",
              border: "none",
              padding: "24px",
            }}
          >
            <h4 className="mb-0 text-white">
              Order History ({orders.length}{" "}
              {orders.length === 1 ? "order" : "orders"})
            </h4>
          </Card.Header>

          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table
                hover
                className="mb-0"
                style={{
                  border: "none",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th
                      style={{
                        padding: "20px",
                        border: "none",
                        color: "#184F38",
                        fontWeight: "600",
                      }}
                    >
                      Order ID
                    </th>
                    <th
                      style={{
                        padding: "20px",
                        border: "none",
                        color: "#184F38",
                        fontWeight: "600",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: "20px",
                        border: "none",
                        color: "#184F38",
                        fontWeight: "600",
                      }}
                    >
                      Total
                    </th>
                    <th
                      style={{
                        padding: "20px",
                        border: "none",
                        color: "#184F38",
                        fontWeight: "600",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        padding: "20px",
                        border: "none",
                        color: "#184F38",
                        fontWeight: "600",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: "1px solid #e9ecef",
                        transition: "all 0.3s ease",
                      }}
                      className="hover-effect"
                    >
                      <td
                        style={{
                          padding: "20px",
                          border: "none",
                          fontWeight: "600",
                        }}
                      >
                        #{order.id}
                      </td>
                      <td
                        style={{
                          padding: "20px",
                          border: "none",
                          color: "#666",
                        }}
                      >
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </td>
                      <td
                        style={{
                          padding: "20px",
                          border: "none",
                          fontWeight: "600",
                          fontSize: "20px",
                          color: "#184F38",
                        }}
                      >
                        EGP{" "}
                        {order.totalPrice
                          ? Number(order.totalPrice).toFixed(2)
                          : "0.00"}
                      </td>
                      <td
                        style={{
                          padding: "20px",
                          border: "none",
                          textAlign: "center",
                          verticalAlign: "middle",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Badge
                          bg={getStatusVariant(order.status, order.isPaid)}
                          style={{
                            fontSize: "20px",
                            padding: "8px 16px",
                            borderRadius: "20px",
                          }}
                        >
                          {getStatusText(order.status, order.isPaid)}
                        </Badge>
                      </td>
                      <td style={{ padding: "20px", border: "none" }}>
                        <Link to={`/order/${order.id}`}>
                          <Button
                            className="btn-sm"
                            style={{
                              backgroundColor: "transparent",
                              borderColor: "#184F38",
                              color: "#184F38",
                              borderRadius: "20px",
                              padding: "6px 20px",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#184F38";
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = "#184F38";
                            }}
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}

      <div style={{ height: "50px" }}></div>
    </Container>
  );
}

export default OrdersScreen;
