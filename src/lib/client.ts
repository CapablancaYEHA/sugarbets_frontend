import axios from "axios";

export const isDev = () => import.meta.env.DEV;
const url = isDev()
  ? "http://localhost:4000/api"
  : "http://89.223.31.81:4000/api";

const controller = new AbortController();

const instance = axios.create({
  baseURL: url,
  timeout: 4000,
  signal: controller.signal,
});

// FIXME
// здесь в итоге надо какой-то более полноценный объект собирать?
instance.interceptors.response.use(undefined, function (error) {
  const res =
    error.response?.data?.message != null ? error.response?.data : error;

  return Promise.reject(res);
});

export const registerUser = ({ name, mail, pass }) =>
  instance
    .post("/auth/register", { name, mail, pass })
    .then((response) => response.data);

export const login = ({ mail, pass }) =>
  instance
    .post("/auth/login", { mail, pass })
    .then((response) => response.data);

export const getEvents = () => {
  const token = localStorage.getItem("TOKEN") || "";
  return instance
    .get("/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const getProfile = (id: string) => {
  const token = localStorage.getItem("TOKEN") || "";
  return instance
    .get(`/profile?user=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const getPlayers = (game: string, locale: "RU" | "INT") =>
  instance
    .get(`/players?game=${game}&locale=${locale}`)
    .then((response) => response.data);

export const getEvent = (id: string) => {
  const token = localStorage.getItem("TOKEN") || "";
  return instance
    .get(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const createBet = ({ betBody, game, userId, eventId }) => {
  const token = localStorage.getItem("TOKEN") || "";
  return instance
    .post(
      "/bets",
      { betBody, game, userId, eventId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);
};

export const closeEvent = ({ betBody, game, eventId }) => {
  const token = localStorage.getItem("TOKEN") || "";
  return instance
    .post(
      "/events/close",
      { betBody, game, eventId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);
};

// FIXME нужно ли тут завязываться на Bearer ?
export const initPayment = (id: string, returnUri = `${window.origin}`) =>
  instance
    .post("/payment", { id, returnUri })
    .then((response) => response.data);
