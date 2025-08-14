import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="d-flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className="main-content"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
