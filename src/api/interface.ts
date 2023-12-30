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

type JsonObject<T> = { [K in keyof T]: T[K] extends Json<T> ? T[K] : never };
type Json<T> = boolean | number | string | null | Array<JsonObject<T>>;

export interface IEventsResponse {
  betsArray: string[]; // айдишники ставок
  eventTitle: string;
  games: string[] | null;
  innerId: string;
  isActive: boolean;
  startDate: string; // "2023-12-27T13:00:00.000Z"
  org?: string;
  info?: string;
}

export interface ICreateBetReq {
  betBody: string; //json string всего объекта из формы
  game: string;
  userId: string;
  eventId: string;
}
