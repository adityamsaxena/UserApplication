import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../service/authService";
import toast from "react-hot-toast";
import Button from "../../components/button";
import Toast from "../../components/toast";

export const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await login(values);

      if (result.message === "success") {
        const token = result.data.token;
        Toast("success", "login Successfull!");
        onLogin(token);
        navigate("/home");
      } else {
        Toast("error", "Unexpected response from the server");
      }
    } catch (message) {
      if (message === "Email is not verified") {
        Toast("error", "Please verify your email first");
        navigate("/verification");
      } else if (message === "Invalid credentials") {
        Toast("error", "Incorrect credentials or please register first");
        setFieldError("password", "Invalid credentials");
      } else {
        Toast(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 🔮 Glassmorphism style
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backgroundImage:
      "linear-gradient(135deg, rgba(138,43,226,0.3), rgba(255,255,255,0.05))",
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4" style={glassStyle}>
            <h1
              className="text-center mb-4"
              style={{ color: "#6f42c1", fontWeight: "bold" }}
            >
              Login Here!
            </h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="btn btn-success w-100"
                    title={isSubmitting ? "Logging in..." : "Log In"}
                    disabled={isSubmitting}
                  ></Button>
                </Form>
              )}
            </Formik>

            <div className="text-center mt-3">
              <small>
                Don't have an account?{" "}
                <Button
                  onClick={() => navigate("/register")}
                  title="Register Here"
                  className="btn btn-link p-0 text-primary text-decoration-none"
                ></Button>
              </small>
            </div>

            <div className="text-center mt-2">
              <small>
                <Button
                  className="btn btn-link p-0"
                  title=" Forgot Password?"
                  style={{ fontSize: "0.875rem" }}
                  onClick={() => navigate("/forgot-password")}
                ></Button>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
