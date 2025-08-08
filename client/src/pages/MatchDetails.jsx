import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import ScoreBoard from "../Components/MatchDetail/ScoreBoard";
import SubNav2 from "../Components/MatchDetail/SubNav2";
import Commentary from "../Components/MatchDetail/Commentary";
import { useParams } from "react-router-dom";
import socket from "../../socket";

export const MatchDataContext = createContext({});

const MatchDetails = () => {
  const { id } = useParams();
  const cleanId = id.startsWith(":") ? id.slice(1) : id;

  const [matchData, setMatchData] = useState({});
  useEffect(() => {
    const fetchdata = () => {
      socket.emit("match-details", cleanId);
    };
    fetchdata();

    socket.on("matchDetails", (data) => {
      setMatchData(data);
      console.log("Received matchDetails data:", data);
    });

    return () => {
      console.log("Cleaning up socket listener for matchDetails");
      socket.off("matchDetails");
    };
  }, [cleanId]);

  return (
    <div className=" text-black dark:text-white mt-6">
      <ScoreBoard Score={matchData.matchDetails} />
      <div className="flex w-[90%] mx-auto gap-5 my-5">
        <Commentary events={matchData.events} />
        <div className="flex-3/5 w-3/5 px-4 pb-4 dark:bg-[#171C1F] bg-white shadow-lg rounded-2xl">
          <SubNav2 />
          <MatchDataContext.Provider value={matchData}>
            <Outlet />
          </MatchDataContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;