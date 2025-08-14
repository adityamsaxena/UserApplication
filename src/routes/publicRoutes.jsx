import { Login } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { ForgotPassword } from "../pages/auth/forgotPassword";
import { EmailVerify } from "../pages/auth/emailVerify";
import { ResetPassword } from "../pages/auth/resetPassword";

const PublicRoutes = ({ setToken }) => [
  {
    path: "/login",
    element: <Login onLogin={setToken} />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verification/:email/:token/:id",
    element: <EmailVerify />,
  },
  {
    path: "/auth/reset-password/:userId/:authToken",
    element: <ResetPassword />,
  },
];

export default PublicRoutes;
