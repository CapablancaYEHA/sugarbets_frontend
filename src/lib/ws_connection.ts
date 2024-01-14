import { io, Socket } from "socket.io-client";
import { isDev } from "./client";
const url = isDev() ? "http://localhost:80" : "https://89.223.31.81:443";

type ServerToClientEvents = any;
type ClientToServerEvents = any;
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url);

export default socket;
