import moment from "moment";
import { DOW, IGame, ILeague, ITeam } from "../../api/types";

enum DOWVal {
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
}

export const getDOWDatesCount = (
  startDate: string,
  endDate: string,
  day: DOW
): number => {
  const start = moment(startDate).toDate();
  const end = moment(endDate).toDate();
  let count = 0;
  const curDate = new Date(start.getTime());
  while (curDate <= end) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek === DOWVal[day]) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};

const getNextWeekdayAfterDate = (startDate: string, day: DOW): string => {
  const start = moment(startDate).toDate();
  const currentDay = start.getDay();
  if (currentDay === DOWVal[day]) {
    return startDate;
  }
  const curDate = new Date(start.getTime());
  curDate.setDate(curDate.getDate() + 1);
  return getNextWeekdayAfterDate(curDate.toLocaleString(), day);
};

const buildSchedule = (
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  day: DOW,
  gameSlotMinutes: number,
  teams: ITeam[],
  league: ILeague,
  location: string = ""
): IGame[] => {
  const teamMap = Object.fromEntries(teams.map((t) => [t._id, t]));
  const start = moment(startTime);
  const end = moment(endTime);

  const numberOfDays = getDOWDatesCount(startDate, endDate, day);
  const totalTime = end.diff(start, 'minute');
  const gameSlots = Math.floor(totalTime / gameSlotMinutes);
  const totalGamesToCreate = numberOfDays * gameSlots;

  const teamIdMap = Object.keys(teamMap);
  const roundRobin = Object.fromEntries(
    teamIdMap.map((team, location) => [
      team,
      teamIdMap.slice(location + 1, teamIdMap.length),
    ])
  );

  const matchUps = Object.entries(roundRobin)
    .map(([homeId, awayIds]) => awayIds.map((awayId) => [homeId, awayId]))
    .flat()
    .sort(() => (Math.random() > 0.5 ? -1 : 1))
    .slice(0, totalGamesToCreate);

  const firstGameDate = getNextWeekdayAfterDate(startDate, day);
  const mappedGames: IGame[] = matchUps.map(([homeId, awayId], index) => {
    const weekIncrement = Math.floor(index / gameSlots);
    const minuteIncrement = gameSlotMinutes * (index % gameSlots);
    const gameDate = moment(firstGameDate)
      .set("hour", start.get("hour"))
      .set("minute", start.get("minute"))
      .add(minuteIncrement, "minute")
      .add(weekIncrement, "weeks")
      .toLocaleString();

    return {
      _id: "new_placeholder",
      homeTeam: teamMap[homeId],
      awayTeam: teamMap[awayId],
      date: gameDate,
      leagueId: league._id,
      league: league.description,
      location,
    };
  });

  return mappedGames;
};

export default buildSchedule;
