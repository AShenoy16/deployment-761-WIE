import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleQuizButtonClick = () => {
    navigate("/quiz");
  };

  return (
    <div>
      <p>HomePage</p>
      <button onClick={handleQuizButtonClick}>Temporary quiz button</button>
    </div>
  );
};

export default HomePage;
