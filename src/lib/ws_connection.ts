import { io, Socket } from "socket.io-client";
import { isDev } from "./client";
const url = isDev() ? "http://localhost:4000" : "http://89.223.31.81:4000";

type ServerToClientEvents = any;
type ClientToServerEvents = any;
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url);

export default socket;
