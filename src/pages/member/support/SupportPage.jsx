import React from "react";
import SupportComponent from "./components/SupportComponent";
import { useNavigate } from "react-router-dom";

const SupportPage = () => {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate("/member/:id/support/write");
  };

  return (
    <div>
      <SupportComponent submitHandler={submitHandler} />
    </div>
  );
};

export default SupportPage;
