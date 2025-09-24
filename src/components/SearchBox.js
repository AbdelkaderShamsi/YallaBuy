import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Form
      className="d-flex mx-auto"
      style={{ maxWidth: "600px", flex: 1 }}
      onSubmit={submitHandler}
    >
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            height: "45px",
            fontSize: "16px",
            borderRight: "none",
          }}
        />
        <InputGroup.Text
          style={{
            backgroundColor: "#fff",
            borderLeft: "none",
            cursor: "pointer",
          }}
          className="search-icon"
        >
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
export default SearchBox;
