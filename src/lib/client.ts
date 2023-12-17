import axios from "axios";

export const isDev = () => process.env.NODE_ENV === "development";
const url = isDev() ? "http://localhost:4000/api" : "http://89.223.31.81:4000";

const instance = axios.create({
  baseURL: url,
  timeout: 3000,
});

export const getBets = () =>
  instance
    .get("/bets")
    .then((response) => response.data)
    .catch((e) => console.log(e));

export const findBet = (id: string) =>
  instance
    .get(`/bets/${id}`)
    .then((response) => response.data)
    .catch((e) => console.log(e));
