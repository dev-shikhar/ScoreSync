import axios from "axios";
import client from "../config/redis.js";

export function standings(socket) {
  let interval = null;

  const getStandings = async (leagueId, season) => {
    console.log(leagueId);
    const key = `standings:${leagueId}-${season}`;
    try {
      const cache = await client.json.get(key, { path: "$" });
      if (cache) {
        socket.emit("matchStadings", cache[0]);
      } else {
        const options = {
          method: "GET",
          url: "https://v3.football.api-sports.io/standings",
          params: { league: leagueId, season: 2023 },
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": process.env.API_KEY,
          },
        };

        const res = await axios.request(options);
        socket.emit("matchStandings", res.data);
        await client.json.set(key, "$", res.data);
        await client.expire(key, 60);
      }
    } catch (error) {
      console.log(error.message);
      socket.emit("matchStandings", { error: "Failed to load data" });
    }
  };

  socket.on("match-standings", ({league, season}) => {
    console.log(`match-standing: ${league}`,season);
    getStandings(league, season);
    //add interval of 1 min;
  });

  socket.on("disconnect", () => {
    console.log("stats disconnected");
    clearInterval(interval);
  });
}
