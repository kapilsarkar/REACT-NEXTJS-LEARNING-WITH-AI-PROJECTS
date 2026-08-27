import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { account } from "../appwrite/config.js";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying your email...");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  useEffect(() => {
    const verifyToken = async () => {
      if (!userId || !secret) {
        setStatus("Invalid or missing verification link.");
        return;
      }

      try {
        await account.updateVerification({
          userId: userId,
          secret: secret,
        });

        setStatus("Email verified successfully!");
        setIsSuccess(true);
        setTimeout(() => navigate("/dashboard"), 3000);
      } catch (error) {
        console.error("Verification error:", error);
        setStatus(error.message || "Verification failed or token expired.");
      }
    };

    verifyToken();
  }, [userId, secret, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Email Verification</h2>
        <p className={`text-sm ${isSuccess ? "text-green-600" : "text-gray-600"}`}>
          {status}
        </p>

        {isSuccess ? (
          <p className="text-xs text-gray-400">Redirecting to dashboard...</p>
        ) : (
          <Link to="/dashboard" className="inline-block text-sm text-blue-600 hover:underline">
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default Verify;