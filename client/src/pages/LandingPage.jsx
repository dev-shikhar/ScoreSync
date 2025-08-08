import React from "react";
import Competitions from "../Components/LandingPage/Competitions";
import LiveScore from "../Components/LiveScore";

const LandingPage = () => {
  return (
    <div className="flex justify-around">
      <Competitions />
      <LiveScore />
    </div>
  );
};

export default LandingPage;
