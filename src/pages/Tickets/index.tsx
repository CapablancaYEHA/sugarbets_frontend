import {
  Title,
  Box,
  Text,
  Space,
  LoadingOverlay,
  Button,
  Pill,
} from "@mantine/core";
import { useEffect } from "preact/hooks";
import { notifications } from "@mantine/notifications";

import { useAuth } from "../../../utils/auth-manager";
import { useInitPayment, useUserTickets } from "../../api/queryHooks";
import { EventTool, TicketTool } from "./const";

export const Tickets = () => {
  const { userId, setAuth } = useAuth();
  const { data, error, isError, isSuccess, isPending } = useUserTickets(
    userId!,
    !!userId
  );

  const { mutate, isError: payIsErr } = useInitPayment();

  useEffect(() => {
    if (isError) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("TOKEN");
        setAuth(false);
      } else {
        notifications.show({
          title: "Тикеты",
          message: error?.message,
          color: "red",
          autoClose: 3000,
          withBorder: true,
        });
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (payIsErr) {
      notifications.show({
        message: "Не удалось перейти на страницу оплаты",
        color: "red",
        autoClose: 3000,
        withBorder: true,
      });
    }
  }, [payIsErr]);

  return (
    <Box
      component="section"
      py="lg"
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        margin: "0 auto",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Title order={2}>Тикеты</Title>
      <Space h="lg" />
      {isSuccess ? (
        <>
          <Text size="lg">
            У вас {data} <TicketTool />
          </Text>
          <Space h="md" />
          <Text size="md">
            <Pill c="base.5">Тикет</Pill> может быть заполнен и применен к
            любому <EventTool />, и таким образом пополнит призовой фонд
            дисциплины.
          </Text>
          <Space h="xl" />
          <Button
            variant="filled"
            fullWidth={false}
            onClick={() =>
              mutate(userId!, {
                onSuccess: (res) => (window.location.href = res),
              })
            }
            style={{ width: "min-content" }}
          >
            Добавить тикет
          </Button>
        </>
      ) : null}
      <Space h="lg" />
      <Text
        size="xs"
        pt="xs"
        style={(theme) => ({
          borderTop: `1px solid ${theme.colors.base[1]}`,
          margin: "auto 0 0 0",
        })}
      >
        *Если при взаимодействии со страницами, вас выкинуло на Вход - это
        значит, что ваша сессия истекла и необходимо залогиниться заново.
      </Text>
      <LoadingOverlay
        visible={isPending}
        zIndex={30}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
};
