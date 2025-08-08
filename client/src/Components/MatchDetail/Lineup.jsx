import React, { useContext } from "react";
import PlayerCard from "./PlayerCard";
import { MatchDataContext } from "../../pages/MatchDetails";

const groupPlayersByColumn = (startXI) => {
  if (!startXI) return {};
  return startXI.reduce((acc, playerObj) => {
    const grid = playerObj.player.grid;
    if (!grid) return acc;
    const [column] = grid.split(":");
    if (!acc[column]) {
      acc[column] = [];
    }
    acc[column].push(playerObj);
    return acc;
  }, {});
};

const FieldPlayer = ({ player, primaryColor }) => {
  const displayName = player.name.split(" ").pop() || player.name;
  return (
    <div className="flex flex-col items-center text-white">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1"
        style={{ backgroundColor: `#${primaryColor}` }}
      >
        {player.number}
      </div>
      <div className="text-xs  bg-opacity-40 rounded px-1">{displayName}</div>
    </div>
  );
};

const lineupData = [
  {
    team: {
      id: 50,
      name: "Manchester City",
      logo: "https://media.api-sports.io/football/teams/50.png",
      colors: {
        player: {
          primary: "5badff",
          number: "ffffff",
          border: "99ff99",
        },
        goalkeeper: {
          primary: "99ff99",
          number: "000000",
          border: "99ff99",
        },
      },
    },
    formation: "4-3-3",
    startXI: [
      {
        player: { id: 617, name: "Ederson", number: 31, pos: "G", grid: "1:1" },
      },
      {
        player: {
          id: 627,
          name: "Kyle Walker",
          number: 2,
          pos: "D",
          grid: "2:4",
        },
      },
      {
        player: {
          id: 626,
          name: "John Stones",
          number: 5,
          pos: "D",
          grid: "2:3",
        },
      },
      {
        player: {
          id: 567,
          name: "Rúben Dias",
          number: 3,
          pos: "D",
          grid: "2:2",
        },
      },
      {
        player: {
          id: 641,
          name: "Oleksandr Zinchenko",
          number: 11,
          pos: "D",
          grid: "2:1",
        },
      },
      {
        player: {
          id: 629,
          name: "Kevin De Bruyne",
          number: 17,
          pos: "M",
          grid: "3:3",
        },
      },
      {
        player: {
          id: 640,
          name: "Fernandinho",
          number: 25,
          pos: "M",
          grid: "3:2",
        },
      },
      {
        player: {
          id: 631,
          name: "Phil Foden",
          number: 47,
          pos: "M",
          grid: "3:1",
        },
      },
      {
        player: {
          id: 635,
          name: "Riyad Mahrez",
          number: 26,
          pos: "F",
          grid: "4:3",
        },
      },
      {
        player: {
          id: 643,
          name: "Gabriel Jesus",
          number: 9,
          pos: "F",
          grid: "4:2",
        },
      },
      {
        player: {
          id: 645,
          name: "Raheem Sterling",
          number: 7,
          pos: "F",
          grid: "4:1",
        },
      },
    ],
    substitutes: [
      {
        player: {
          id: 50828,
          name: "Zack Steffen",
          number: 13,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 623,
          name: "Benjamin Mendy",
          number: 22,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 18861,
          name: "Nathan Aké",
          number: 6,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 622,
          name: "Aymeric Laporte",
          number: 14,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 633,
          name: "İlkay Gündoğan",
          number: 8,
          pos: "M",
          grid: null,
        },
      },
      { player: { id: 44, name: "Rodri", number: 16, pos: "M", grid: null } },
      {
        player: {
          id: 931,
          name: "Ferrán Torres",
          number: 21,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 636,
          name: "Bernardo Silva",
          number: 20,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 642,
          name: "Sergio Agüero",
          number: 10,
          pos: "F",
          grid: null,
        },
      },
    ],
    coach: {
      id: 4,
      name: "Guardiola",
      photo: "https://media.api-sports.io/football/coachs/4.png",
    },
  },
  {
    team: {
      id: 45,
      name: "Everton",
      logo: "https://media.api-sports.io/football/teams/45.png",
      colors: {
        player: {
          primary: "070707",
          number: "ffffff",
          border: "66ff00",
        },
        goalkeeper: {
          primary: "66ff00",
          number: "000000",
          border: "66ff00",
        },
      },
    },
    formation: "4-3-1-2",
    startXI: [
      {
        player: {
          id: 2932,
          name: "Jordan Pickford",
          number: 1,
          pos: "G",
          grid: "1:1",
        },
      },
      {
        player: {
          id: 19150,
          name: "Mason Holgate",
          number: 4,
          pos: "D",
          grid: "2:4",
        },
      },
      {
        player: {
          id: 2934,
          name: "Michael Keane",
          number: 5,
          pos: "D",
          grid: "2:3",
        },
      },
      {
        player: {
          id: 19073,
          name: "Ben Godfrey",
          number: 22,
          pos: "D",
          grid: "2:2",
        },
      },
      {
        player: {
          id: 2724,
          name: "Lucas Digne",
          number: 12,
          pos: "D",
          grid: "2:1",
        },
      },
      {
        player: {
          id: 18805,
          name: "Abdoulaye Doucouré",
          number: 16,
          pos: "M",
          grid: "3:3",
        },
      },
      { player: { id: 326, name: "Allan", number: 6, pos: "M", grid: "3:2" } },
      {
        player: {
          id: 18762,
          name: "Tom Davies",
          number: 26,
          pos: "M",
          grid: "3:1",
        },
      },
      {
        player: {
          id: 2795,
          name: "Gylfi Sigurðsson",
          number: 10,
          pos: "M",
          grid: "4:1",
        },
      },
      {
        player: {
          id: 18766,
          name: "Dominic Calvert-Lewin",
          number: 9,
          pos: "F",
          grid: "5:2",
        },
      },
      {
        player: {
          id: 2413,
          name: "Richarlison",
          number: 7,
          pos: "F",
          grid: "5:1",
        },
      },
    ],
    substitutes: [
      {
        player: {
          id: 18755,
          name: "João Virgínia",
          number: 31,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 766,
          name: "Robin Olsen",
          number: 33,
          pos: "G",
          grid: null,
        },
      },
      {
        player: {
          id: 156490,
          name: "Niels Nkounkou",
          number: 18,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 18758,
          name: "Séamus Coleman",
          number: 23,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 138849,
          name: "Kyle John",
          number: 48,
          pos: "D",
          grid: null,
        },
      },
      {
        player: {
          id: 18765,
          name: "André Gomes",
          number: 21,
          pos: "M",
          grid: null,
        },
      },
      {
        player: {
          id: 1455,
          name: "Alex Iwobi",
          number: 17,
          pos: "F",
          grid: null,
        },
      },
      {
        player: {
          id: 18761,
          name: "Bernard",
          number: 20,
          pos: "F",
          grid: null,
        },
      },
    ],
    coach: {
      id: 2407,
      name: "C. Ancelotti",
      photo: "https://media.api-sports.io/football/coachs/2407.png",
    },
  },
];

const nullPhotoURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAACUCAMAAAD26AbpAAAAM1BMVEXMzMz////Pz8/8+/zJycnp6enU1NT39/ff39/z8/PX19fs7Oza2tri4uLv7+/l5eXDw8Nk+7XSAAAEoElEQVR4nO2c2XLrIAxAWcTm/f+/9oLdNGniJDbISL7jM5npK6dilRFCXFxcXGwAblA3JA8Vf7ZZsEqczAJi4/s+aHkn+C56nAQAZX2Qj+3/wfXNKSxA+EFLHXl1kK7tGu49CpRp58bqtTAkieBZRwKgGdb//b9oHSWo2/kegOFdD3p00HrkOj9Bo+cmfjSYHaT2gmV38t8a/zgk4ohgJ6HG7QIpVK3l5gBmh8FMq1Ig+GhAv9dAShMFFB+F3TFYHPgogP8+Ea3RsnGALs9AylHwUFjWgywcj2kJRMg1iF2Jh8KeBeEZ3TNQgMYVKEjXUQuIzPn0TksehoKxvKAbagWRsSz/pac2sEUjIREnVlJy9kYvYSA+/xQHIYaBVABsuYGUpEmNuDtCoKNUmAr2FnccaRQwDKSkVEAZCqQ9CWNKTRgyg4wz/3+r0NIpKISFLREuhQLg/AoYOyRihSsKlwIOKLs82hPDgKNAuTqXZMEeIMwAgMdRIMzD4Jw7pSTMYSikI89EmNGDFsOgBUoFnOM/ZYYeZTBo2u8kGIeegfhrVWliO9IRfzNUxQv0QP7Zs3h18+QKpWEYGNwB6ItGg05pMGoFVbTjNixuV3UFB5+gOBjsu0v1hOdhUDCiKU+cj8QJJXy7VLiOI//mfEOpJuQoOMukG81h6DL6kuN0X1WlOJzaYInDzqlVszNQyu5KZwT6qxd/mBUUbB4PWhorWFymemBx2NqZQg/cBG6AajfMrbpVnIt7VGe+rRBjxzQAP8BcwvAhAqZjsTX9gmr6tUVCzwK8I3AHQPnnka11Y6eJumV7iD3K+t6ExGBMr6aJ8xh+C0zzbCtOW14oUknhsuqdZQSs8x84XAocuBQ4cF4FWCrOhY3MC8PJVobU3rhnbePK7BLxb9tFlZN4wDTF1q8kZbR2aZvK3yI1/3dnuoIbmB2an1DWbzg/u5GthfJr/WddoueTyLuRtta7EqvB8yhpu6Em4dOTEbvyqmG0fCptQXg3t35fbtiFjksuBmzQGUWe6REA03BYt8GOLrNKdZGgz2h0YW8H+ivhelKH2JURrv8HygkWfCi/gpHqPMkcVNlX8wcHQ3O1TYkxewy8QNKZQORORG8cqhsoi2oQqf3hKg5kzObfHCqeUKFDDcCCHisesqFzuJ3oh1HVutcTY/DuEaoydK1bJVg3tdeoVPv88vUDD13lgzrOBeH3Esc7QHmx/2cOvx4DWIUj7xmOXqeRqjrpHLCqgz9zaGnPEYvyK+7AVBlWWSqdA2y5JILCcNCslN7TqqRw0NMY0Byzt1vFHeIA3x7pRKU9QGHeYNdT0PhZjXThq6ZCqmvApp/zhxXDYLAdyqoUcsDOaRxyWP6MRn7LTX26cHcQyKPB1hzJN3DD0FIoYBZoQFN1Pv0FcW2AlkYBb7cHtu6qdgdtXgVTd1W7Y7DCMFU66byC9hCaJelECY3Uk7DeosphRAoDyhsFeSAlM47O330CZ6+3ubzlCJC+52J9ms0C5bmY8ur+ElC2q7b6YecRjMGQtniEChi5+poJsDUQxnN61Z9SAeMLYk+rMJYbYF4WyeF7LuYfMJg6LhisXDoAAAAASUVORK5CYII=";
const Lineup = () => {
  const matchData = useContext(MatchDataContext);

  const lineup = matchData?.lineups;
  // const lineup = lineupData;
 if (!lineup || lineup.length < 2) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center p-8 min-h-[400px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-20 text-gray-400 dark:text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
        />
      </svg>
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
        Lineup Not Yet Announced
      </h3>
      <p className="text-md text-gray-600 dark:text-gray-400">
        Team sheets are usually released about an hour before kick-off.
      </p>
      <p className="text-md text-gray-600 dark:text-gray-400">
        Please check back closer to the match time.
      </p>
    </div>
  );
}
  const homeTeam = lineup[0];
  const awayTeam = lineup[1];

  const homePlayersByColumn = groupPlayersByColumn(homeTeam.startXI);
  const awayPlayersByColumn = groupPlayersByColumn(awayTeam.startXI);

  const maxSubs = Math.max(
    homeTeam.substitutes.length,
    awayTeam.substitutes.length
  );

  return (
    <div>
      <div className="flex justify-between px-2">
        <div className="flex flex-col gap-1 items-start">
          <div className="text-lg font-semibold">{homeTeam.team.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {homeTeam.formation}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-lg font-semibold">{awayTeam.team.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {awayTeam.formation}
          </div>
        </div>
      </div>

      {/* Field and Lineup */}
      <div className="flex justify-center items-center bg-[#3C8063] dark:bg-transparent">
        <div
          className="bg-center bg-no-repeat bg-cover w-full h-[550px] bg-[url('/field.png')] dark:bg-[url('/field-dark.png')] flex"
          style={{ backgroundSize: "100% 100%" }}
        >
          {/* Home Team Lineup */}
          <div className="flex h-full w-[50%] justify-around">
            {Object.keys(homePlayersByColumn)
              .sort()
              .map((columnKey) => (
                <div
                  key={`home-col-${columnKey}`}
                  className="flex flex-col justify-around text-center"
                >
                  {homePlayersByColumn[columnKey].map(({ player }) => (
                    <FieldPlayer
                      key={player.id}
                      player={player}
                      primaryColor={homeTeam.team.colors.player.primary}
                    />
                  ))}
                </div>
              ))}
          </div>

          {/* Away Team Lineup */}
          <div className="flex h-full w-[50%] justify-around">
            {Object.keys(awayPlayersByColumn)
              .sort((a, b) => b - a) // Sort in reverse for the other side of the pitch
              .map((columnKey) => (
                <div
                  key={`away-col-${columnKey}`}
                  className="flex flex-col justify-around text-center"
                >
                  {awayPlayersByColumn[columnKey].map(({ player }) => (
                    <FieldPlayer
                      key={player.id}
                      player={player}
                      primaryColor={awayTeam.team.colors.player.primary}
                    />
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Managers */}
      <div className="text-center text-lg font-semibold mt-10">Managers</div>
      <div className="flex mt-3">
        <div className="w-1/2 text-start pl-5 dark:border-r-gray-500 border-r-gray-400 border-r-1 flex gap-2 items-center">
          <img
            src={homeTeam.coach.photo || nullPhotoURL}
            className="w-10 h-10 rounded-full"
          ></img>
          {homeTeam.coach.name}
        </div>
        <div className="w-1/2 pl-5 flex gap-2 items-center">
          <img
            src={awayTeam.coach.photo || nullPhotoURL}
            className="w-10 h-10 rounded-full"
          ></img>
          {awayTeam.coach.name}
        </div>
      </div>

      {/* Substitutes */}
      <div className="text-center text-lg font-semibold mt-10">Substitutes</div>
      {Array.from({ length: maxSubs }).map((_, index) => (
        <PlayerCard
          key={`sub-${index}`}
          homeSub={homeTeam.substitutes[index]}
          awaySub={awayTeam.substitutes[index]}
        />
      ))}
    </div>
  );
};

export default Lineup;
