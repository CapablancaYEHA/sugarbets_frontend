import { notifications } from "@mantine/notifications";

interface IProp {
  c: "red" | "green";
  m?: string;
  t?: string | null;
}
export const notif = ({ c, m, t }: IProp) =>
  notifications.show({
    title: t,
    message: m,
    color: c,
    autoClose: 5000,
    withBorder: true,
  });
