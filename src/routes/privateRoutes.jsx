import { Navigate } from "react-router-dom";
import { UserDetail } from "../pages/user/userDetail";
import { UserList } from "../pages/user/UserList";
import HomePage from "../pages/auth/homePage";
import Sidebar from "../layouts/sidebar";
import { useState } from "react";

const PrivateRoute = ({ Component }) => {
  const token = localStorage.getItem("authToken");

  const [sideBar, setSideBar] = useState(false);

  return token ? (
    <div>
      <Sidebar isSideBarOpen={sideBar} setIsSideBarOpen={setSideBar}></Sidebar>
      <div
        style={{
          marginLeft: sideBar ? "250px" : "",
          transition: "margin-left 0.3s ease",
        }}
      >
        {" "}
        <Component />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

const PrivateRoutes = () => [
  {
    path: "/home",
    element: <PrivateRoute Component={HomePage} />,
  },
  {
    path: "/userlist",
    element: <PrivateRoute Component={UserList} />,
  },
  {
    path: "/user/:id",
    element: <PrivateRoute Component={UserDetail} />,
  },
];

export default PrivateRoutes;
