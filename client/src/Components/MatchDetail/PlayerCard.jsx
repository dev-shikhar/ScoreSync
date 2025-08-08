import React from "react";

const PlayerCard = ({ homeSub, awaySub }) => {
  const findPos = (pos) =>{
    switch(pos){
      case 'M' : return 'Midfielder';
      case 'F' : return 'Forward';
      case 'D' : return "Defender";
      case 'G' : return "Goalkeeper";
    }
  }
  return (
    <div className="flex">
      <div className="pt-3 pr-7 pl-5 flex-1/2 w-1/2 dark:border-r-gray-500 border-r-gray-400 border-r-1">
        {homeSub && (
          <div className="border-b-1 pb-2 dark:border-b-gray-500 border-b-gray-400">
            <div>
              <span className="font-bold">{homeSub.player.number}</span>.{" "}
              {homeSub.player.name}
            </div>
            <div className="opacity-55 text-sm">Position: {findPos(homeSub.player.pos)}</div>
          </div>
        )}
      </div>

      {/* Away Team Substitute */}
      <div className="flex-1/2 w-1/2 pl-3 pt-3">
        {awaySub && (
          <div className="border-b-1 pb-2 dark:border-b-gray-500 border-b-gray-400">
            <div>
              <span className="font-bold">{awaySub.player.number}</span>.{" "}
              {awaySub.player.name}
            </div>
            <div className="opacity-55 text-sm">Position: {findPos(awaySub.player.pos)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;