import React from "react";

const Button = ({
  className = "btn btn-primary",
  onClick,
  title,
  type = "button",
  style = {},
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
