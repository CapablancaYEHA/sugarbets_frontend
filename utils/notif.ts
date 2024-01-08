import { notifications } from "@mantine/notifications";

interface IProp {
  c: "red" | "green";
  m?: string;
  t?: string | null;
  close?: number;
}
export const notif = ({ c, m, t, close = 5000 }: IProp) =>
  notifications.show({
    title: t,
    message: m,
    color: c,
    autoClose: close,
    withBorder: true,
  });
