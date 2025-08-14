import React from "react";

const HomePage = () => {
  const sectionStyle = {
    background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
    color: "#ffffff",
    animation: "fadeIn 1.2s ease-in-out",
  };

  const headingStyle = {
    fontSize: "3.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
    textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
  };

  const paragraphStyle = {
    fontSize: "1.4rem",
    fontWeight: "400",
    maxWidth: "600px",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
  };

  const fadeInKeyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      <style>{fadeInKeyframes}</style>
      <section style={sectionStyle}>
        <h1 style={headingStyle}>Welcome to User App</h1>
        <p style={paragraphStyle}>
          Manage your users effortlessly with speed and style. <br />
          Everything you need in one intuitive and responsive dashboard.
        </p>
      </section>
    </>
  );
};

export default HomePage;
