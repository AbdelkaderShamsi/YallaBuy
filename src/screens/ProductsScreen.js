import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import Message from "./Message";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ProductsScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [visibleCount, setVisibleCount] = useState(8);
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "";
  const keyword = queryParams.get("keyword") || queryParams.get("search") || "";

  const productsList = useSelector((state) => state.productsList);
  const { error, loading, products } = productsList;

  const navigate = useNavigate();

  useEffect(() => {
    setVisibleCount(8);
    dispatch(listProducts(category, keyword));
  }, [dispatch, category, keyword]);

  const showMore = () => setVisibleCount((prev) => prev + 8);

  return (
    <Container className="py-4">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <div
            className="text-center d-flex align-items-center justify-content-center px-3"
            style={{
              height: "50px",
              width: "300px",
              backgroundColor: "#184F38",
              borderRadius: "10px",
              color: "white",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "40px" }}>
              {category ? category : "All Products"}
            </h2>
          </div>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <PulseLoader color="#184F38" margin={5} speedMultiplier={0.5} />
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products && products.length > 0 ? (
        <>
          <Row className="g-4">
            {products.slice(0, visibleCount).map((product) => (
              <Col key={product._id || product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          {visibleCount < products.length && (
            <div className="text-center mt-4 mb-3">
              <Button
                onClick={showMore}
                style={{
                  backgroundColor: "#184F38",
                  borderColor: "white",
                  fontSize: "20px",
                }}
              >
                See More
              </Button>
            </div>
          )}
        </>
      ) : (
        <Message variant="info">No products found</Message>
      )}
    </Container>
  );
}

export default ProductsScreen;
