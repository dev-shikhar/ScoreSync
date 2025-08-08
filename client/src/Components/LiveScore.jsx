import React, { useEffect, useState } from "react";
import SubNav from "./LandingPage/SubNav";
import ScoreCard from "./LandingPage/ScoreCard";
import dayjs from "dayjs";
import socket from "../../socket";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GradientCircularProgress from "./GradientCircularProgress";

const LiveScore = () => {
  const [date, setSelectedDate] = useState(dayjs());
  const [visible, setVisible] = useState(10);
  function handleDate(newDate) {
    setSelectedDate(newDate);
  }
  const [groupedByComp, setGroupedByComp] = useState([]);

  useEffect(() => {
    const fetchScores = () => {
      socket.emit("daily", date.format("YYYY-MM-DD"));
    };

    fetchScores(); // Initial fetch

    socket.on("daily-sch", (grouped) => {
      if (!Array.isArray(grouped)) {
        setGroupedByComp([]);
        return;
      }
      setGroupedByComp(grouped);
    });
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    let intervalId;
    if (yourDate.toISOString().split("T")[0] === date.format("YYYY-MM-DD")) {
      intervalId = setInterval(fetchScores, 32000); 
    }
    return () => {
      clearInterval(intervalId);
      socket.off("daily-sch");
    };
  }, [date]);


  return (
    <div className="mb-5 mr-5 w-[50%]">
      <div className="flex flex-col gap-1 text-black dark:text-white w-full p-2 bg-white dark:bg-[#111517] rounded-md">
        <SubNav setDate={handleDate} />
        {groupedByComp.length === 0 ? 
        (<div className="h-[300px] flex items-center justify-center text-3xl">
            <GradientCircularProgress />
        </div>) :
        (groupedByComp.slice(0, visible).map(({ seasonName, details }) => (
          <div
            className="flex flex-wrap items-center my-2 border-b border-gray-200 dark:border-gray-700"
            key={seasonName}
          >
            <div className="pl-2 w-[7.5%]">
              <img
                src="https://www.svgrepo.com/show/451131/no-image.svg"
                width="30px"
                height="30px"
              ></img>
            </div>
            <div>
              <p className="opacity-[0.5] text-xs">
                {details[0].league.country}
              </p>
              <p className="text-l font-bold">{seasonName}</p>
            </div>
            <div className="w-full "></div>
            <div className="w-full pb-4">
              {details.map((comp, idx) => {
                return <ScoreCard key={idx} details={comp} />;
              })}
            </div>
          </div>
        )))}
        {visible < groupedByComp.length && (
          <div className="w-full flex justify-center">
            <button
              className="rounded-full px-2 py-1 text-[#7a84ff] cursor-pointer transition hover:bg-[#f2f4f7] dark:hover:bg-[#0B0E0F] "
              onClick={() => setVisible(groupedByComp.length)}
            >
              <KeyboardArrowDownIcon />
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveScore;
