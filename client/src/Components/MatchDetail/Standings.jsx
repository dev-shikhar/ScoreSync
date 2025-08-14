import React,{useEffect, useState} from 'react';
import { getLeagueInfo } from '../../store/leagueInfo';
import GradientCircularProgress from '../GradientCircularProgress';
import socket from '../../../socket.js';

const FormResult = ({ result }) => {
  const baseClasses = 'w-5 h-5 flex items-center justify-center rounded-sm text-xs font-bold text-white';
  const colorClass = {
    W: 'bg-green-500',
    D: 'bg-gray-400 dark:bg-gray-600',
    L: 'bg-red-500',
  }[result];

  return <div className={`${baseClasses} ${colorClass}`}>{result}</div>;
};

const RankBadge = ({ rank }) => {
    let colorClass = 'bg-transparent text-gray-500 dark:text-gray-400';
    if (rank <= 2) colorClass = 'bg-green-500 text-white';
    else if (rank <= 4) colorClass = 'bg-green-600 text-white';
    else if (rank === 5) colorClass = 'bg-blue-500 text-white';
    else if (rank === 6) colorClass = 'bg-indigo-500 text-white';

    // else if (rank === 7) colorClass = 'bg-teal-500 text-white';
  
    return (
      <div className={`h-6 w-6 flex items-center justify-center rounded-full text-xs font-bold ${colorClass}`}>
        {rank}
      </div>
    );
  };
  

export const Standings = () => {
  const {id,season} = getLeagueInfo();
  const [standings,setStandings] = useState([]);
  useEffect(()=>{
    socket.emit("match-standings",{league:id, season:season});
    
    socket.on("matchStandings",(data) =>{
      console.log(data);
      const stand = data?.response?.[0]?.league?.standings?.[0] || [];
      setStandings(stand);
    })
  },[id,season])

  if(standings.length === 0){
    return (
      <div className="flex items-center justify-center h-[300px] ">
        <GradientCircularProgress />
      </div>
    )
  }

  return ( 
    <div className="font-sans px-4 pb-4 rounded-xl shadow-lg">
      <div className='pb-4'> Sorry! The current plans doesn't support this seasons standings.The current one displayed is of 2023 season </div>
      <div className="flex justify-center mb-4">
        <button className="px-4 py-1.5 text-sm font-semibold text-white bg-gray-800 dark:bg-gray-700 rounded-full">ALL</button>
        <button className="px-4 py-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">HOME</button>
        <button className="px-4 py-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">AWAY</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="col" className="px-2 py-3 text-center">#</th>
              <th scope="col" className="px-2 py-3">Team</th>
              <th scope="col" className="px-2 py-3 text-center">P</th>
              <th scope="col" className="px-2 py-3 text-center">W</th>
              <th scope="col" className="px-2 py-3 text-center">D</th>
              <th scope="col" className="px-2 py-3 text-center">L</th>
              <th scope="col" className="px-2 py-3 text-center">DIFF</th>
              <th scope="col" className="px-2 py-3 text-center">Goals</th>
              <th scope="col" className="px-6 py-3">Last 5</th>
              <th scope="col" className="px-2 py-3 text-center">PTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s) => (
              <tr key={s.team.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <td className="px-2 py-4 text-center">
                    <RankBadge rank={s.rank} />
                </td>
                <td className="px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={s.team.logo} alt={s.team.name} className="w-6 h-6 mr-3" />
                    {s.team.name}
                  </div>
                </td>
                <td className="px-2 py-4 text-gray-700 dark:text-gray-300 text-center">{s.all.played}</td>
                <td className="px-2 py-4 text-gray-700 dark:text-gray-300 text-center">{s.all.win}</td>
                <td className="px-2 py-4 text-gray-700 dark:text-gray-300 text-center">{s.all.draw}</td>
                <td className="px-2 py-4 text-gray-700 dark:text-gray-300 text-center">{s.all.lose}</td>
                <td className="px-2 py-4 text-gray-700 dark:text-gray-300 text-center font-medium">
                  {s.goalsDiff > 0 ? `+${s.goalsDiff}` : s.goalsDiff}
                </td>
                <td className="px-2 py-4 text-gray-700 dark:text-gray-300 text-center">{`${s.all.goals.for}:${s.all.goals.against}`}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    {s.form.split('').map((result, index) => (
                      <FormResult key={index} result={result} />
                    ))}
                  </div>
                </td>
                <td className="px-2 py-4 font-bold text-gray-900 dark:text-white text-center">{s.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Standings