import { useState } from "react";
import useUserStore from "../store/useUserStore";
import LoginForm from "../pages/LoginForm.jsx";
import RegisterForm from "../pages/RegisterForm.jsx";
import Profile from "../pages/Profile.jsx";

const Login = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const user = useUserStore((state) => state.user);

  // If user is authenticated in Zustand, render Profile view directly
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <Profile />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md">
        {isRegistered ? (
          <LoginForm setIsRegistered={setIsRegistered} />
        ) : (
          <RegisterForm setIsRegistered={setIsRegistered} />
        )}
      </div>
    </div>
  );
};

export default Login;
