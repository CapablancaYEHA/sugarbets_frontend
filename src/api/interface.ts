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
  lastLogin: string;
}

export interface IPlayersResponse {
  nick: string;
  country: string;
}

type IPrizePool = {
  [key: string]: number;
};
export type IBetBod = {
  [key: string]: string | string[];
};
type IThumb = {
  height: number;
  url: string;
  width: number;
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
  masterBetbody: { [key: string]: IBetBod } | null;
  winners: {
    [key: string]: string;
  } | null;
  locale: "RU" | "INT";
  orgPic?: [
    {
      filename: string;
      height: number;
      id: string;
      size: number;
      thumbnails: { small: IThumb; large: IThumb; full: IThumb };
      url: string;
      width: number;
    }
  ];
}

export interface ICloseEventReq {
  betBody: string; //json string всего объекта из формы
  game: string;
  eventId: string;
}

export interface ICreateBetReq extends ICloseEventReq {
  userId: string;
}

export interface IBetRes {
  innerId: string;
  authorName: string[]; //один чел в массиве
  authorId: string;
  game: string;
  forEventName: [string]; // one elem
  forEventId: [string]; // one elem
  isActive: boolean[]; // one elem
  dateCreated: string; // "2023-12-27T13:00:00.000Z"
  betBody: IBetBod;
}

export interface IPlayersReq {
  game: string;
  locale: "RU" | "INT";
}
