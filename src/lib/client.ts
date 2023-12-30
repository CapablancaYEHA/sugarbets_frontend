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
// здесь в итоге надо какой-то более полноценный объект собирать
instance.interceptors.response.use(undefined, function (error) {
  const res =
    error.response?.data?.message != null ? error.response?.data : error;

  return Promise.reject(res);
});

export const getBets = () => {
  const token = localStorage.getItem("TOKEN") || "";
  return instance
    .get("/bets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

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

export const getTickets = (id: string) => {
  const token = localStorage.getItem("TOKEN") || "";
  return instance
    .get(`/tickets?user=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const getPlayers = () => {
  const token = localStorage.getItem("TOKEN") || "";
  return instance
    .get("/players", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const findBet = (id: string) =>
  instance.get(`/bets/${id}`).then((response) => response.data);

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

export const registerUser = ({ name, mail, pass }) =>
  instance
    .post("/auth/register", { name, mail, pass })
    .then((response) => response.data);

export const createBet = ({ betBody, game, userId, eventId }) =>
  instance
    .post("/bets", { betBody, game, userId, eventId })
    .then((response) => response.data);

export const login = ({ mail, pass }) =>
  instance
    .post("/auth/login", { mail, pass })
    .then((response) => response.data);

export const initPayment = (id: string, returnUri = `${window.origin}`) =>
  instance
    .post("/payment", { id, returnUri })
    .then((response) => response.data);

// export const initPayment = (id: string) =>
//   axios
//     .post(
//       "https://yoomoney.ru/quickpay/confirm",
//       {
//         receiver: "4100118483492189",
//         label: id,
//         "quickpay-form": "button",
//         sum: 2.0,
//         paymentType: "AC",
//         successURL: `${window.origin}/`,
//       },
//       {
//         timeout: 4000,
//         signal: controller.signal,
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       }
//     )
//     .then((response) => {
//       const { responseURL } = response.request;
//       if (responseURL.includes("error?reason")) {
//         throw { message: "Ошибка инициализации платежа" };
//       }
//       console.log("response.request.responseURL", response.request.responseURL);
//       window.location.href = response.request.responseURL;
//     });
