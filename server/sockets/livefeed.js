import axios from "axios";
import client from "../config/redis.js";

export function liveFeedHandler(socket) {
  let interval = null;

const groupSchedulesBySeason = (schedules) => {
    const groupedMap = new Map();

    schedules.forEach((event) => {
      const seasonName = event.league.name;
      if (!groupedMap.has(seasonName)) {
        groupedMap.set(seasonName, []);
      }
      groupedMap.get(seasonName).push(event);
    });

    return Array.from(groupedMap.entries()).map(([seasonName, events]) => ({
      seasonName,
      details: events,
    }));
  };

  const fetchAndEmitLiveScores = async () => {
    try {
      const cache = await client.json.get("live", { path: "$" });
      if (cache) {
        socket.emit("live_scores", cache[0]);
      } else {
        const options = {
          method: "GET",
          url: "https://v3.football.api-sports.io/fixtures",
          params: { live: "all" },
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": process.env.API_KEY, // Replace with your real API key
          },
        };
        const res = await axios.request(options);
        const grouped = groupSchedulesBySeason(res.data.response);
        
        socket.emit("live_scores", grouped);
        await client.json.set("live","$",grouped);
        await client.expire("live",60);
      }
    } catch (err) {
      console.error("Error fetching live feed:", err.message);
    }
  };

  socket.on("start-soccer-live", () => {
    console.log("Live feed started");
    fetchAndEmitLiveScores();
    interval = setInterval(fetchAndEmitLiveScores, 60 * 1000); // every minute
  });

  socket.on("stop-soccer-live", () => {
    console.log("Live feed stopped");
    clearInterval(interval);
  });

  socket.on("disconnect", () => {
    console.log("Live feed stopped");
    clearInterval(interval);
  });
}
