export interface IUserLoginRequest {
  pass: string;
  mail: string;
}
export interface IUserRegisterRequest extends IUserLoginRequest {
  name: string;
}

export interface IPlayersResponse {
  nick: string;
  country: string;
}

type IPrizePool = {
  [key: string]: number;
};
export interface IEventsResponse {
  betsArray?: string[]; // айдишники ставок
  eventTitle: string;
  games: string[] | null;
  innerId: string;
  isActive: boolean;
  startDate: string; // "2023-12-27T13:00:00.000Z"
  org?: string;
  info?: string;
  prizePool: IPrizePool;
}

export interface ICreateBetReq {
  betBody: string; //json string всего объекта из формы
  game: string;
  userId: string;
  eventId: string;
}
