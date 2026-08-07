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
      <div className="flex min-h-[85vh] w-full items-center justify-center p-4">
        <Profile />
      </div>
    );
  }

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center py-8 px-4">
      {/* Background glow accents tailored for form card */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="h-80 w-80 rounded-full bg-violet-600/10 blur-3xl -ml-20 -mt-20" />
      </div>

      {/* Dynamic Form Viewport Container */}
      <div className="relative z-10 w-full max-w-xl">
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