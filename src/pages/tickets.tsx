import { useLocation } from "preact-iso";
import { Title } from "@mantine/core";

export const Tickets = () => {
  const location = useLocation();

  return <Title order={2}>Покупка билета</Title>;
};
