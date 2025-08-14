import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { resetPassword } from "../../service/authService";
import Button from "../../components/button";
import Toast from "../../components/toast";

export const ResetPassword = () => {
  const { userId, authToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      Toast("error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(userId, authToken, password);
      setMessage(result.message);
      Toast("success", `${result.message}`);
      navigate("/login");
    } catch (err) {
      setError(err);
      Toast("error", `${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-gradient bg-warning bg-opacity-75 py-5 px-3">
      <div
        className="card shadow-lg border-0 rounded-4 p-4 w-100"
        style={{ maxWidth: "420px" }}
      >
        <div className="text-center mb-4">
          <div
            className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{ width: 60, height: 60 }}
          >
            <i className="bi bi-shield-lock-fill fs-3 text-white"></i>
          </div>
          <h3 className="mt-3 fw-bold">Reset Password</h3>
          <p className="text-muted">Set a new password for your account.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control rounded-3"
              id="newPassword"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="newPassword">
              <i className="bi bi-key me-2"></i>New Password
            </label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control rounded-3"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">
              <i className="bi bi-key-fill me-2"></i>Confirm Password
            </label>
          </div>

          <Button
            type="submit"
            className="btn btn-warning btn-lg w-100 fw-semibold shadow-sm"
            title={
              loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )
            }
            disabled={loading}
          ></Button>
        </form>

        {message && (
          <div className="alert alert-success mt-4 text-center">{message}</div>
        )}
        {error && (
          <div className="alert alert-danger mt-4 text-center">{error}</div>
        )}
      </div>
    </div>
  );
};
