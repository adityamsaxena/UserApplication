import { useState } from "react";
import { sendPasswordResetLink } from "../../service/authService";
import Button from "../../components/button";
import Toast from "../../components/toast";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await sendPasswordResetLink(email);
      setMessage(result.message);
      Toast("success", `${result.message}`);
      console.log(result);
    } catch (err) {
      setError(err);
      Toast("error", `${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3ffe7, #d9e7ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            title={loading ? "Sending..." : "Send Reset Link"}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#4caf50",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%",
            }}
          ></Button>
        </form>

        {message && (
          <div style={{ marginTop: "20px", color: "green" }}>
            <strong>{message}</strong>
          </div>
        )}

        {error && (
          <div style={{ marginTop: "20px", color: "red" }}>
            <strong>{error}</strong>
          </div>
        )}
      </div>
    </div>
  );
};
