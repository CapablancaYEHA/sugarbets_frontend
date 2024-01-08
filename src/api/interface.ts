export interface IUserLoginRequest {
  pass: string;
  mail: string;
}
export interface IUserRegisterRequest extends IUserLoginRequest {
  name: string;
}

export interface IProfile {
  userName: string;
  userMail: string;
  tickets: number;
  innerId: string;
  betsArray?: string[];
  paymentsArray?: string[];
  role: "user" | "admin";
}

export interface IPlayersResponse {
  nick: string;
  country: string;
}

type IPrizePool = {
  [key: string]: number;
};
type IBetBod = {
  [key: string]: string | string[];
};
// FIXME Поправить game на ENUM
export interface IEventsResponse {
  betsArray?: string[]; // айдишники ставок
  eventTitle: string;
  games: string[];
  innerId: string;
  isActive: boolean;
  startDate: string; // "2023-12-27T13:00:00.000Z" когда начинаем принимать ставки
  tourEnd: string; // дата проведения события + ориентир когда ставки уже не принимаются
  org?: string;
  info?: string;
  prizePool: IPrizePool;
  masterBetbody: IBetBod | null;
  winners: {
    [key: string]: string;
  } | null;
  locale: "RU" | "INT";
}

export interface ICloseEventReq {
  betBody: string; //json string всего объекта из формы
  game: string;
  eventId: string;
}

export interface ICreateBetReq extends ICloseEventReq {
  userId: string;
}

export interface IPlayersReq {
  game: string;
  locale: "RU" | "INT";
}
