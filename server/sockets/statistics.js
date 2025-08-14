import axios from "axios";
import client from "../config/redis.js";

export function statistics(socket) {
  let interval = null;
  const sort = (data) => {
    const match = data.response;

    if (!match || match.length < 2) {
      return;
    }

    const [teamAData, teamBData] = match;
    const teamBStatsMap = new Map(
      teamBData.statistics.map((stat) => [stat.type, stat.value])
    );

    const combinedStats = teamAData.statistics
      .map((statA) => {
        const valueA = statA.value;
        const valueB = teamBStatsMap.get(statA.type);

        if (
          valueA === null ||
          valueA === undefined ||
          valueB === null ||
          valueB === undefined
        ) {
          return null;
        }

        const isPercentage = typeof valueA === "string" && valueA.includes("%");

        const parsedValueA = isPercentage ? parseInt(valueA, 10) : valueA;
        const parsedValueB = isPercentage ? parseInt(valueB, 10) : valueB;

        if (isNaN(parsedValueA) || isNaN(parsedValueB)) {
          return null;
        }

        return {
          label: statA.type,
          valueA: parsedValueA,
          valueB: parsedValueB,
          isPercentage: isPercentage,
        };
      })
      .filter(Boolean);

      const stats = {
        stats : combinedStats,
        home: teamAData.team,
        away: teamBData.team
      }

    return stats;
  };

  const getStats = async (matchId) => {
    console.log(matchId);
    const key = `statstics:${matchId}`;
    try {
      const cache = await client.json.get(key, { path: "$" });
      if (cache) {
        socket.emit("matchStatistics", cache[0]);
      } else {
        const options = {
          method: "GET",
          url: "https://v3.football.api-sports.io/fixtures/statistics",
          params: { fixture: matchId },
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": process.env.API_KEY,
          },
        };

        const res = await axios.request(options);
        const sortedData = sort(res.data);
        socket.emit("matchStatistics", sortedData);
        await client.json.set(key, "$", sortedData);
        await client.expire(key, 60);
      }
    } catch (error) {
      console.log(error.message);
      socket.emit("matchStatistics", { error: "Failed to load data" });
    }
  };

  socket.on("match-stats", (id) => {
    console.log(`match-stats: ${id}`);
    getStats(id);
    //add interval of 1 min;
  });

  socket.on("disconnect", () => {
    console.log("stats disconnected");
    clearInterval(interval);
  });

}

