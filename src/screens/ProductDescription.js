import React, { useState } from "react";

function ProductDescription({ description, limit = 120 }) {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  const toggleExpanded = () => setExpanded(!expanded);

  const shortText =
    description.length > limit
      ? description.substring(0, limit) + "..."
      : description;

  return (
    <small>
      {expanded ? description : shortText}
      {description.length > limit && (
        <span
          onClick={toggleExpanded}
          style={{
            color: "#007bff",
            cursor: "pointer",
            fontWeight: "500",
            marginLeft: "5px",
          }}
        >
          {expanded ? " See Less" : " See More"}
        </span>
      )}
    </small>
  );
}

export default ProductDescription;
