import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { Form } from "react-bootstrap";
import Message from "./Message";
import {
  Row,
  Col,
  Image,
  Container,
  ListGroup,
  ListGroupItem,
  Card,
  Table,
} from "react-bootstrap";
import Rating from "./Rating";
import { listProductDetails } from "../actions/productsActions";
import ProductDescription from "./ProductDescription";

function ProductDetails({ params }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  return (
    <Row className="g-4 my-2">
      <Col md={3} className="d-flex justify-content-center mx-4">
        <Image
          src={product.image}
          alt={product.name}
          className="product-image-byone"
          fluid
        />
      </Col>

      <Col md={5}>
        <Card className="shadow-sm rounded w-100">
          <Card.Header as="h4" className="bg-light">
            {product.brand} {product.name}
          </Card.Header>
          <Card.Body>
            <Table
              bordered
              hover
              responsive
              className="mb-0 w-100"
              style={{ fontSize: "20px" }}
            >
              <tbody>
                <tr>
                  <td>
                    <strong>Rating</strong>
                  </td>
                  <td>
                    <div className="table-stars">
                      <Rating value={product.rating} color={"#f8e825"} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Reviews</strong>
                  </td>
                  <td style={{ fontSize: "21px" }}>{product.numReviews}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Description</strong>
                  </td>
                  <td>
                    <ProductDescription
                      description={product.description}
                      limit={120}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>EGP {product.price}</strong>
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row className="align-items-center">
                <Col>Status:</Col>
                <Col>{product.stock > 0 ? "In Stock" : "Out of Stock"}</Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row className="align-items-center">
                <Col>Quantity</Col>
                <Col className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    disabled={qty <= 1 || product.stock === 0}
                  >
                    -
                  </button>
                  <span
                    className="mx-2 text-center"
                    style={{
                      width: "50px",
                      display: "inline-block",
                      fontWeight: "bold",
                    }}
                  >
                    {qty}
                  </span>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setQty((prev) => Math.min(product.stock, prev + 1))
                    }
                    disabled={qty >= product.stock || product.stock === 0}
                  >
                    +
                  </button>
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <button
                className="btn btn-success w-100"
                disabled={product.stock === 0}
                type="button"
                onClick={addToCartHandler}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default ProductDetails;
