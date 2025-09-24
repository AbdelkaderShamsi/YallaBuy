import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Rating({ value, text, color = "#f8e825" }) {
  const renderStar = (index) => {
    if (value >= index) {
      return <FaStar color={color} />;
    } else if (value >= index - 0.5) {
      return <FaStarHalfAlt color={color} />;
    } else {
      return <FaRegStar color={color} />;
    }
  };

  return (
    <div
      className="rating"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "24px",
      }}
    >
      {value !== undefined && (
        <span style={{ marginRight: "17px" }}>{Number(value).toFixed(1)}</span>
      )}

      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index} style={{ marginRight: "6px" }}>
          {renderStar(index)}
        </span>
      ))}
    </div>
  );
}

export default Rating;
