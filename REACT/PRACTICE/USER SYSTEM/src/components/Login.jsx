import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login = () => {
  const [isRegistered, setIsRegistered] = useState(true);

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      {isRegistered ? (
        <LoginForm setIsRegistered={setIsRegistered} />
      ) : (
        <RegisterForm setIsRegistered={setIsRegistered} />
      )}
    </div>
  );
};

export default Login;