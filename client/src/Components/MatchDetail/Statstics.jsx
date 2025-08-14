import React, { useContext, useEffect, useState } from "react";
import StatRow from "./StatRow";
import GradientCircularProgress from "../GradientCircularProgress";
import socket from '../../../socket.js';
import { MatchDataContext } from "../../pages/MatchDetails.jsx";

const Statstics = () => {
  const {matchId} = useContext(MatchDataContext)
  console.log(matchId);
  const [stats, setStats] = useState([]);
  const [teamA, setTeamA] = useState();
  const [teamB, setTeamB] = useState();
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  useEffect(() => {
    //setConnectionStatus("Live");
    socket.emit("match-stats", matchId);

    socket.on("matchStatistics", (data) => {
      console.log(data);
      if (data.home && data.away && data.stats) {
        setTeamA(data.home);
        setTeamB(data.away);
        setStats(data.stats);
      }
    });

    return () => {
      socket.off("match-stat");
    };
  }, [matchId]);

  if(stats.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] ">
        <GradientCircularProgress />
      </div>
    )
  }

  return (
    <div>
      <div className="min-h-screen text-gray-900 dark:text-gray-100 font-sans">
        <div className="max-w-4xl mx-auto">
          <main className="bg-white dark:bg-[#171C1F] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-lg md:text-xl font-semibold text-teal-600 dark:text-teal-400">
                {teamA.name}
              </h2>
              {/* <div className="text-center">
                <p className="text-xs text-red-500 font-bold uppercase tracking-wider">
                  {connectionStatus}
                </p>
              </div> */}
              <h2 className="text-lg md:text-xl font-semibold text-red-600 dark:text-red-400">
                {teamB.name}
              </h2>
            </div>

            <div className="space-y-4">
                {stats.map((stat, index) => (
                  <StatRow
                    key={index}
                    label={stat.label}
                    valueA={stat.valueA}
                    valueB={stat.valueB}
                    isPercentage={stat.isPercentage}
                  />
                ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Statstics;
