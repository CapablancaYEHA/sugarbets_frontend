import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from "axios";

export const isDev = () => process.env.NODE_ENV === "development";
const url = isDev()
  ? "http://localhost:4000/api"
  : "http://89.223.31.81:4000/api";

const controller = new AbortController();

const instance = axios.create({
  baseURL: url,
  timeout: 3000,
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

export const findBet = (id: string) =>
  instance.get(`/bets/${id}`).then((response) => response.data);

export const registerUser = ({ name, mail, pass }) =>
  instance
    .post("/auth/register", { name, mail, pass })
    .then((response) => response.data);

export const login = ({ mail, pass }) =>
  instance
    .post("/auth/login", { mail, pass })
    .then((response) => response.data);
