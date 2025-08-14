import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../service/authService";
import Button from "../../components/button";
import Toast from "../../components/toast";

export const EmailVerify = () => {
  const navigate = useNavigate();
  const { email, token, id } = useParams();

  const handleVerify = async () => {
    try {
      const result = await verifyEmail(token, id);

      if (result.message === "Email verified successfully") {
        Toast("success", "Email verified successfully");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        Toast(
          "error",
          result.message || "Unexpected response during verification"
        );
      }
    } catch (e) {
      Toast("error", "Email verification failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 rounded">
            <h2 className="text-center" style={{ color: "#548fea" }}>
              Email Verification
            </h2>
            <div className="form-group text-center">
              <input
                type="text"
                className="form-control mb-3"
                value={email}
                readOnly
              />
              <Button
                title="Verify Email"
                onClick={handleVerify}
                className="btn btn-primary w-100"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
