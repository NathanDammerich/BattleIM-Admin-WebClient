import moment from "moment";
import { ITimeslot } from "../api/types";

export const displayTimeslot = (timeslot: ITimeslot[] | string): string => {
  if (typeof timeslot === "string") {
    return timeslot;
  }
  return `${timeslot[0].day} ${moment(timeslot[0].timeStart).format(
    "h:mm a"
  )}-${moment(timeslot[0].timeEnd).format("h:mm a")}`;
};
