import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleQuizButtonClick = () => {
    navigate("/quiz");
  };

  return (
    <div>
      <p>Login</p>
      <button onClick={handleQuizButtonClick}>Login</button>
    </div>
  );
};

export default LoginPage;
