import axios from "axios";
import client from "../config/redis.js";

export function matchDetails(socket) {
  let interval = null;

  const sort = (data) => {
    const match = data.response[0];
    const homeId = match.teams.home.id;

    const getTeamSide = (id) => (id === homeId ? "home" : "away");

    const formatTime = ({ time, comments }) => {
      if (comments === "Penalty Shootout") {
        return `121'`;
      }
      if (time.extra != null && time.extra != undefined) {
        return `${time.elapsed}+${time.extra}'`;
      } else {
        return `${time.elapsed}'`;
      }
    };

    let processedEvents = match.events.map((e) => {
      if (e.comments === "Penalty Shootout") {
        return {
          desc: {
            ...e,
            time: { elapsed: 121, extra: null },
          },
          team: getTeamSide(e.team?.id),
        };
      }
      return {
        desc: { ...e },
        team: getTeamSide(e.team?.id),
      };
    });

    const createSpecialEvent = (elapsed, detail) => ({
      desc: {
        time: { elapsed, extra: null },
        type: "Time",
        detail: detail,
      },
      team: null,
    });

    const insertEvent = (eventList, eventToInsert) => {
      const insertTime = eventToInsert.desc.time.elapsed;
      let insertIndex = eventList.findIndex(
        (e) => e.desc.time.elapsed > insertTime
      );

      if (insertIndex === -1) {
        insertIndex = eventList.length;
      }
      eventList.splice(insertIndex, 0, eventToInsert);
    };

    const { score } = match;

    if (score.halftime &&
      (score.halftime.home !== null || score.halftime.away !== null)) {
      const { home, away } = score.halftime;
      const halftimeEvent = createSpecialEvent(
        45,
        `Half Time (${home} - ${away})`
      );
      insertEvent(processedEvents, halftimeEvent);
    }

    if (score.fulltime &&
      (score.fulltime.home !== null || score.fulltime.away !== null)) {
      const { home, away } = score.fulltime;
      const fulltimeEvent = createSpecialEvent(
        90,
        `Full Time (${home} - ${away})`
      );
      insertEvent(processedEvents, fulltimeEvent);
    }

    if (
      score.extratime &&
      (score.extratime.home !== null || score.extratime.away !== null)
    ) {
      const { home, away } = match.goals;
      const extratimeEvent = createSpecialEvent(
        120,
        `End of Extra Time (${home} - ${away})`
      );
      insertEvent(processedEvents, extratimeEvent);
    }

    if (
      score.penalty &&
      (score.penalty.home !== null || score.penalty.away !== null)
    ) {
      const { home, away } = score.penalty;
      const penaltyEvent = createSpecialEvent(
        121,
        `Penalty Shootout (${home} - ${away})`
      );
      processedEvents.push(penaltyEvent);
    }

    const goalScorers = match.events
      .filter((e) => {
        return e.type === "Goal" && e.comments !== "Penalty Shootout";
      })
      .map((e) => ({
        time: formatTime(e),
        scorer: e.player?.name,
        team: getTeamSide(e.team?.id),
      }));

    const redCards = match.events
      .filter((e) => e.type === "Card" && e.detail === "Red Card")
      .map((e) => ({
        name: e.player?.name,
        team: getTeamSide(e.team?.id),
        time: formatTime(e),
      }));

    const matchDetails = {
      matchDetails: {
        score: {
          home: match.goals.home,
          away: match.goals.away,
          status: match.fixture.status.long,
          goalScorers,
          redCards,
          penalties:
            match.score.penalty.home != null
              ? `PEN ${match.score.penalty.home} - ${match.score.penalty.away}`
              : null,
        },
        dateTime: match.fixture.date,
        competitionName: match.league.name,
        venue: `${match.fixture.venue.name}`,
        teams: match.teams,
      },
      events: processedEvents,
      lineups : match.lineups,
    };

    return matchDetails;
  };

  const scoreDetails = async (matchId) => {
    console.log(matchId);
    const key = `match:${matchId}`;
    try {
      const cache = await client.json.get(key, { path: "$" });
      if (cache) {
        socket.emit("matchDetails", cache[0]);
      } else {
        const options = {
          method: "GET",
          url: "https://v3.football.api-sports.io/fixtures",
          params: { id: matchId },
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": process.env.API_KEY,
          },
        };

        const res = await axios.request(options);
        const sortedData = sort(res.data);
        socket.emit("matchDetails", sortedData);
        await client.json.set(key, "$", sortedData);
        await client.expire(key, 60);
      }
    } catch (error) {
      console.log(error.message);
      socket.emit("matchDetails", { error: "Failed to load data" });
    }
  };

  socket.on("match-details", (id) => {
    console.log("match-details");
    scoreDetails(id);

  });

  socket.on("disconnect", () => {
    console.log("match disconnected");
    clearInterval(interval);
  });
}