import React, { useEffect } from "react";
import Navbar from "./Components/LandingPage/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import socket from "../socket.js";
import { Routes, Route } from "react-router-dom";
import MatchDetails from "./pages/MatchDetails.jsx";
import Lineup from "./Components/MatchDetail/Lineup.jsx";
import Statstics from "./Components/MatchDetail/Statstics.jsx";
import Standings from "./Components/MatchDetail/Standings.jsx";

const App = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-[150px]"></div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<MatchDetails />}>
          <Route index element={<Lineup />} />
          <Route path="statistics" element={<Statstics />} />
          <Route path = "standings" element={<Standings />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
