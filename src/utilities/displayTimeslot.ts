import moment from "moment";
import { ITimeslot } from "../api/types";

export const displayTimeslot = (timeslot: ITimeslot | string): string => {
  if (typeof timeslot === "string") {
    return timeslot;
  }
  return `${timeslot.day} ${moment(timeslot.timeStart).format(
    "h:mm a"
  )}-${moment(timeslot.timeEnd).format("h:mm a")}`;
};
