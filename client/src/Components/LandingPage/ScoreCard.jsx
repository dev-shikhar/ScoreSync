import React, { createContext, useEffect, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { setLeagueInfo } from "../../store/leagueInfo";

const ScoreCard = (prop) => {
  const [fav, setFav] = useState(false);
  const [sTime, setTime] = useState();
  const [status, setStatus] = useState();
  const [isLive, setLive] = useState(false);

  function handleClick() {
    setFav((prev) => !prev);
  }

  useEffect(() => {
    const timeStamp = prop.details.fixture.timestamp;
    const date = new Date(timeStamp * 1000);

    // Format as 24-hour time
    const time = date.toISOString().slice(11, 16);
    setTime(time);

    const st = prop.details.fixture.status.short;
    if (st === "1H" || st === "ET" || st === "2H" || st === "LIVE") {
      setLive(true);
      const ex = prop.details.fixture.status.extra;
      const te = prop.details.fixture.status.elapsed;
      console.log(te);

      if (ex) setStatus(te + `+` + ex + " '");
      else {
        setStatus(te + " '");
      }
    } else {
      setStatus(st);
    }
  }, [status]);
  return (
    <div className="w-full font-normal">
      <Link
        to={`/:${prop.details.fixture.id}`}
        className="w-full mt-3 flex items-center"
        onClick={() => {
          setLeagueInfo({
            id: prop.details.league.id,
            season: prop.details.league.season,
          });
        }}
      >
        <div className=" border-r-1  w-[7.5%] wrap-anywhere">
          <p className="opacity-[0.5] text-xs text-center">{sTime}</p>
          <p
            className="text-xs text-center"
            style={isLive ? { color: "#E73B3B" } : { opacity: "0.5" }}
          >
            {status}
          </p>
        </div>
        <div className="w-[92.5%]">
          <div className="flex justify-between">
            <div>
              <p className="text-sm pl-2">{prop.details.teams.home.name}</p>
              <p className="text-sm pl-2">{prop.details.teams.away.name}</p>
            </div>
            <div className="flex items-center gap-4 mr-2">
              <div>
                <p className="text-sm">{prop.details.goals.home}</p>
                <p className="text-sm">{prop.details.goals.away}</p>
              </div>
              <button className="cursor-pointer" onClick={handleClick}>
                {fav ? <StarIcon /> : <StarBorderIcon />}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ScoreCard;
