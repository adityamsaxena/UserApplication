import { useState, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./routes/privateRoutes";

function App() {
  const getToken = localStorage.getItem("authToken");
  const [token, setToken] = useState(getToken);

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: token ? <Navigate to="/userlist" /> : <Navigate to="/login" />,
    },
    ...PublicRoutes({ setToken }),
    ...PrivateRoutes({ token }),
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
