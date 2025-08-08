import React from "react";
import EventContent from "./EventContent";
import LineDecorator from "../Icons/LineDecorator";

const EventRow = ({ event }) => {
  const isHome = event.team === "home";

  if (event.desc.type === "Time") {
    return (
      <div className="flex justify-center items-center my-3">
        <LineDecorator />
        <span className="px-4 text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap tracking-wider">
          {event.desc.detail}
        </span>
        <LineDecorator flipped={true} />
      </div>
    );
  }

  const formatTime = ({ time, comments }) => {
    if (comments === "Penalty Shootout") {
      return "";
    }
    if (time.extra != null && time.extra != undefined) {
      return `${time.elapsed}+${time.extra}'`;
    } else {
      return `${time.elapsed}'`;
    }
  };

  return (
    <div className="flex items-center my-2 mx-2 ">
      <div className="w-full flex justify-start">
        {isHome && (
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
              {formatTime(event.desc)}
            </span>
            <EventContent event={event.desc} isHome={isHome} />
          </div>
        )}
      </div>

      <div className="w-full flex justify-end pr-4">
        {!isHome && (
          <div className="flex items-center gap-3">
            <EventContent event={event.desc} isHome={isHome} />
            <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
              {formatTime(event.desc)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventRow;
