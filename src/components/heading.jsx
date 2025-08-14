import React from "react";

const Heading = ({ title }) => {
  return (
    <>
      <div
        className="text-center text-white py-3 px-2 mb-4"
        style={{
          background: "linear-gradient(to right, #0066ff, #00ccff)",
          borderRadius: "1rem",
        }}
      >
        <h3 className="mb-0 fw-bold">{title}</h3>
      </div>
    </>
  );
};

export default Heading;
