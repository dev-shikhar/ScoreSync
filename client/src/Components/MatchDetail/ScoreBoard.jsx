import React, { useEffect, useState } from "react";
import Icon from "../Icons/Football";
import Field from "../Icons/Field";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RedCardIcon from "../Icons/RedCardIcon";
import GradientCircularProgress from "../GradientCircularProgress";

const ScoreBoard = ({ Score }) => {
  const [dnt, setdnt] = useState(null);

  useEffect(() => {
    if (Score?.dateTime) {
      const localDate = new Date(Score.dateTime);
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, "0");
      const day = String(localDate.getDate()).padStart(2, "0");
      const hours = String(localDate.getHours()).padStart(2, "0");
      const minutes = String(localDate.getMinutes()).padStart(2, "0");
      const formatted = `${year}-${month}-${day} ${hours}:${minutes}`;
      setdnt(formatted);
    }
  }, [Score]);

  if (!Score) {
    return (
      <div className="h-screen  flex justify-center items-center">
        <GradientCircularProgress />
      </div>
    );
  }

  return (
    <div className="dark:bg-[#171C1F] bg-white rounded-2xl my-2 p-4 flex flex-col items-center font-normal w-[90%] mx-auto shadow-lg ">
      <div className="w-full flex justify-center ">
        <div className="text-sm opacity-50 text-center">{/* Agg: 1-2 */}</div>
      </div>

      <div className="grid grid-cols-3 items-center w-full mx-auto sm:gap-8 gap-4 my-2">
        
        <div className="flex justify-end items-center gap-2">
          <span className="text-base sm:text-lg font-medium text-right">
            {Score.teams.home.name}
          </span>
          
          <div className="w-7 h-7 sm:w-10 sm:h-10  rounded-full ">
            <img
              src={Score.teams.home.logo}
              alt={`${Score.teams.home.name} Logo`}
              className="w-full h-full object-contain" 
            />
          </div>
        </div>

  
        <div className="text-2xl sm:text-3xl font-bold text-center">
          {Score?.score?.home != null && Score?.score?.away != null
            ? `${Score.score.home} - ${Score.score.away}`
            : (dnt ? dnt.substring(11) : '...')}
        </div>

        <div className="flex justify-start items-center gap-2">
           <div className="w-7 h-7 sm:w-10 sm:h-10  rounded-full ">
            <img
              src={Score.teams.away.logo}
              alt={`${Score.teams.away.name} Logo`}
              className="w-full h-full object-contain" 
            />
          </div>
          <span className="text-base sm:text-lg font-medium text-left">
            {Score.teams.away.name}
          </span>
        </div>
      </div>

      <div className="w-full flex justify-center ">
        <div className="text-2xs px-3 opacity-50 text-center">
          {Score.score.penalties ? Score.score.penalties : Score.score.status }  
          
        </div>
      </div>

      <div className="w-full grid grid-cols-[1fr_auto_1fr] items-start opacity-50 mt-5 gap-4">
        <div className="text-sm text-right flex flex-col gap-0.5">
          {Score.score.goalScorers
            .filter((goal) => goal.team === "home")
            .map((goal, index) => (
              <div key={index}>
                {goal.scorer} {goal.time}
              </div>
            ))}
        </div>
        <div className="flex items-center h-full">
          {Score.score.goalScorers.length != 0 && <Icon />}
        </div>
        <div className="text-sm text-left flex flex-col gap-0.5">
          {Score.score.goalScorers
            .filter((goal) => goal.team === "away")
            .map((goal, index) => (
              <div key={index}>
                {goal.scorer} {goal.time}
              </div>
            ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-[1fr_auto_1fr] items-start  mt-4 gap-4">
        <div className="text-sm text-right flex flex-col gap-0.5 opacity-50">
          {Score.score.redCards
            .filter((goal) => goal.team === "home")
            .map((goal, index) => (
              <div key={index}>
                {goal.name} {goal.time}'
              </div>
            ))}
        </div>
        <div className="flex items-center h-full">
          {Score.score.redCards != 0 && <RedCardIcon />}
        </div>
        <div className="text-sm text-left flex flex-col gap-0.5 opacity-50">
          {Score.score.redCards
            .filter((goal) => goal.team === "away")
            .map((goal, index) => (
              <div key={index}>
                {goal.name} {goal.time}'
              </div>
            ))}
        </div>
      </div>

      <div className="flex w-full justify-center opacity-50 gap-10 text-sm mt-5">
        <div className="flex gap-1 items-center">
          <CalendarTodayIcon fontSize="inherit" />
          <div>{dnt ? dnt.replace(" ", " • ") : "Loading..."}</div>
        </div>
        <div>{Score.competitionName}</div>
        <div className="flex gap-1 items-center">
          <Field />
          {Score.venue}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
