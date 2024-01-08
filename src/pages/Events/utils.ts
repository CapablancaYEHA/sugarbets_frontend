import { compareAsc } from "date-fns/compareAsc";
import { parseISO } from "date-fns/parseISO";

import { IEventsResponse } from "../../api/interface";

// NOTE Очень важно в таблице проставлять правильное время начала ивента.
// (Очевидно, когда известны все заявленные игроки и\или готова pool\топ32 стадия)
// При запросе с бэка оно сравнивается с реальным временем и соответственно доступ открывается
export const isEventStarted = (ev: IEventsResponse) => {
  const parsed = parseISO(ev.startDate);
  return compareAsc(new Date(), parsed) === 1 && ev.isActive;
};

export const isEventComing = (ev) => {
  const parsed = parseISO(ev.startDate);
  return compareAsc(new Date(), parsed) === -1 && ev.isActive;
};

export const sortByAsc = (a: IEventsResponse, b: IEventsResponse) =>
  compareAsc(a.tourEnd, b.tourEnd);
