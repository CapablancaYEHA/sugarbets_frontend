import { compareAsc } from "date-fns/compareAsc";
import { parseISO } from "date-fns/parseISO";

import { IEventsResponse } from "../../api/interface";

// NOTE Это время открытия ставок.
// (Очевидно, когда известны все заявленные игроки и\или готова pool\топ32 стадия)
// При запросе эвентов с бэка оно сравнивается с реальным временем и соответственно доступ открывается
export const isAbleToBet = (ev: IEventsResponse) => {
  const start = parseISO(ev.startDate);
  const end = parseISO(ev.tourEnd);
  return (
    compareAsc(new Date(), start) === 1 &&
    compareAsc(new Date(), end) !== 1 &&
    ev.isActive
  );
};

export const isWaitResults = (ev: IEventsResponse) => {
  const end = parseISO(ev.tourEnd);
  return compareAsc(new Date(), end) === 1 && ev.isActive;
};

export const sortByAsc = (a: IEventsResponse, b: IEventsResponse) =>
  compareAsc(a.tourEnd, b.tourEnd);
