import React from "react";
import EventRow from "./EventRow";

const Commentary = ({ events}) => {
  if (!events) {
    return <div>Loading events</div>;
  }

  const processEventsWithScore = (allEvents) => {
    let currentScore = { home: 0, away: 0 };
    let penaltyScore = { home: 0, away: 0 };
    return allEvents.map(event => {
      if (event.desc.type === 'Goal' && event.desc.detail !== 'Missed Penalty') {
        if(event.desc.comments === "Penalty Shootout"){
          if(event.team === 'home'){
            penaltyScore.home += 1;
          }else{
            penaltyScore .away += 1;
          }
        }
        if (event.team === 'home') {
          currentScore.home += 1;
        } else {
          currentScore.away += 1;
        }
        return {
          ...event,
          desc: {
            ...event.desc,
            score: { ...currentScore },
            penalty : { ...penaltyScore} 
          }
        };
      }
      return event;
    });
  };

  const eventsWithScore = processEventsWithScore(events);
  
  return (
    <div className="flex-2/5">
      <div className="dark:bg-[#171C1F] bg-white rounded-2xl p-2">
        <div className="font-sans transition-colors duration-300 ">
          <div className="max-w-3xl mx-auto ">
            <div>
              {eventsWithScore.slice().reverse().map((event, index) => (
                <EventRow key={index} event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commentary;