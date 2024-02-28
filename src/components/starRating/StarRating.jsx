import { useState } from "react";
import Star from "./Star";
import { PropTypes } from "prop-types";
const containerStyle = {
  display: " flex",
  alignItems: "center",
  gap: "10px",
};

const starContainer = {
  display: "flex",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  defaultRating: PropTypes.number,
  setMovieRating: PropTypes.func,
  size: PropTypes.number,
  messages: PropTypes.Array,
  className: PropTypes.string,
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 30,
  className,
  messages = [],
  defaultRating = 0,
  setMovieRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 2}px`,
  };

  function onRate(value) {
    setRating(value);
    setMovieRating(value);
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => onRate(i + 1)}
            full={tempRating >= i + 1 || rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}
