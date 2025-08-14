import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sideBar.css";
import Button from "../components/button";

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Open Button */}
      {!isOpen && (
        <Button
          title={<i className="bi bi-list fs-4 text-white"></i>}
          className="open-btn bg-primary rounded-circle p-2 position-fixed"
          onClick={() => {
            setIsOpen(true), setIsSideBarOpen(true);
          }}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""} dark-theme shadow-lg`}>
        <button
          className="close-btn rounded-circle position-absolute top-0 end-0 m-3"
          onClick={() => {
            setIsOpen(false), setIsSideBarOpen(false);
          }}
        >
          <i className="bi bi-x-lg text-white fs-6"></i>
        </button>

        <div className="sidebar-header px-3 pt-5 pb-3">
          <h5 className="text-light fw-semibold">
            <i className="bi bi-person-circle me-2"></i>User App
          </h5>
        </div>

        <div className="sidebar-content d-flex flex-column gap-3 p-3">
          <Link to="/home" className="menu-btn">
            <i className="bi bi-house-door-fill me-2"></i>Home
          </Link>

          <Link to="/userlist" className="menu-btn">
            <i className="bi bi-people-fill me-2"></i>User List
          </Link>

          <Button
            title={
              <>
                <i className="bi bi-box-arrow-right me-2"></i>Sign Out
              </>
            }
            className="btn btn-danger mt-4 w-100"
            onClick={handleSignOut}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
