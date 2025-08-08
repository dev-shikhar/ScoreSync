import axios from "axios";
import client from "../config/redis.js";

export function dailyMatches(socket) {
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

  const schedule = async (date) => {
    const key = `DailyMatches:${date}`;

    try {
      const cache = await client.json.get(key, { path: "$" });
      // console.log(cache);
      if (cache) {
        socket.emit("daily-sch", cache[0]);
      } else {

        const options = {
          method: "GET",
          url: "https://v3.football.api-sports.io/fixtures",
          params: { date: date },
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": process.env.API_KEY, 
          },
        };
        const res = await axios.request(options);

        const grouped = groupSchedulesBySeason(res.data.response);
        socket.emit("daily-sch", grouped);
        await client.json.set(key, "$", grouped);
        await client.expire(key, 60);
      }
    } catch (err) {
      console.error("Error in loading daily feed", err.message);
      socket.emit("daily-sch", { error: "Failed to load data" });
    }
  };
  socket.on("daily", (date) => {
    console.log("daily schedule");
    // console.log(date);
    schedule(date);
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    if (yourDate.toISOString().split("T")[0] === date) {
      interval = setInterval(() => schedule(date), 60 * 1000); // Enable if needed
    }
  });

  socket.on("stop-daily", () => {
    console.log("daily-disconnected");
    clearInterval(interval);
  });

  socket.on("disconnect", () => {
    console.log("daily disconnected");
    clearInterval(interval);
  });
}

