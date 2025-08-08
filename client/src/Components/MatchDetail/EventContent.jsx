import React from "react";
import YellowCardIcon from "../Icons/YellowCardIcon";
import RedCardIcon from "../Icons/RedCardIcon";
import Football from "../Icons/Football";
import VarIcon from "../Icons/VarIcon";
import SubstitutionIcon from "../Icons/SubstitutionIcon";

const EventContent = ({ event, isHome }) => {
  const containerClasses = `flex items-center gap-2 ${
    isHome ? "flex-row-reverse" : ""
  }`;
  const textPlayer = "font-bold text-gray-900 dark:text-white";
  const textReason = "text-sm text-gray-500 dark:text-gray-400";

  switch (event.type) {
    case "Goal":
      const isPenaltyShootout = event.comments === "Penalty Shootout";

      if (isPenaltyShootout) {
        return (
          <div
            className={`flex items-center gap-3 ${
              isHome ? "flex-row-reverse" : ""
            }`}
          >
            <div>
              <p className={textPlayer}>{event.player.name}</p>
              <p className={textReason}>{event.detail}</p>
            </div>
            {event.penalty && (
              <div className="flex items-center gap-2 bg-blue-600 text-white font-bold text-sm px-2 py-0.5 rounded-md">
                {event.penalty.home} - {event.penalty.away}
              </div>
            )}
          </div>
        );
      }
      return (
        <div
          className={`flex items-center gap-3 ${
            isHome ? "flex-row-reverse" : ""
          }`}
        >
          <div>
            <p className={textPlayer}>{event.player.name}</p>
            <p className={textReason}>{event.detail}</p>
          </div>
          {event.score && (
            <div className="flex items-center gap-2 bg-blue-600 text-white font-bold text-sm px-2 py-0.5 rounded-md">
              {event.score.home} - {event.score.away}
            </div>
          )}
          <Football />
        </div>
      );
    case "Card":
      return (
        <div className={containerClasses}>
          <div>
            <p className={textPlayer}>{event.player.name}</p>
            <p className={textReason}>{event.detail}</p>
          </div>
          {event.detail === "Yellow Card" ? (
            <YellowCardIcon />
          ) : (
            <RedCardIcon />
          )}
        </div>
      );
    case "subst":
      return (
        <div className={containerClasses}>
          <div>
            <span className={textPlayer}>{event.assist.name}</span>
            <span className="p-1"></span>
            <span className={textReason}>{event.player.name}</span>
          </div>
          <SubstitutionIcon />
        </div>
      );
    case "var":
      return (
        <div className={containerClasses}>
          <div>
            <p className={textReason}>{event.detail}</p>
          </div>
          <VarIcon />
        </div>
      );
    default:
      return <div>{event.type}</div>;
  }
};

export default EventContent;
