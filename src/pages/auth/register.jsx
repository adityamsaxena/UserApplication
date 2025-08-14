import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../service/authService";
import Button from "../../components/button";
import Toast from "../../components/toast";

export const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    emailAddress: "",
    userPassword: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    emailAddress: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    userPassword: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { emailVerificationTOken, id } = await registerUser(
        values.fullName,
        values.emailAddress,
        values.userPassword
      );

      Toast(
        "success",
        "Registration successful! Please check your email for verification."
      );
      navigate(
        `/verification/${values.emailAddress}/${emailVerificationTOken}/${id}`
      );
    } catch (error) {
      Toast("error", "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 rounded">
            <h1 className="text-center" style={{ color: "purple" }}>
              Register Here!
            </h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="emailAddress" className="form-label">
                      Email Address
                    </label>
                    <Field
                      type="email"
                      id="emailAddress"
                      name="emailAddress"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="emailAddress"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="userPassword"
                      name="userPassword"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="userPassword"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      className="btn btn-primary w-100"
                      title={isSubmitting ? "Registering..." : "Register"}
                      disabled={isSubmitting}
                    ></Button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-4 text-center">
              <span className="text-muted">Already have an account? </span>
              <Button
                className="btn btn-link text-decoration-none"
                title="Sign In"
                onClick={() => navigate("/login")}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
