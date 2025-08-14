import React from "react";

const Loader = ({ size = "3rem", color = "primary" }) => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div
          className={`spinner-border text-${color}`}
          role="status"
          style={{ width: size, height: size }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
