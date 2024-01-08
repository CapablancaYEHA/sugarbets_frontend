import {
  Title,
  Box,
  Text,
  Space,
  LoadingOverlay,
  Button,
  Pill,
  Highlight,
} from "@mantine/core";
import { useEffect } from "preact/hooks";

import { useAuth } from "../../../utils/auth-manager";
import { useInitPayment, useProfile } from "../../api/queryHooks";
import { notif } from "../../../utils/notif";
import { useLogout } from "../../../utils/useLogout";
import { EventTool, TicketTool } from "./const";

export const Tickets = () => {
  const { userId } = useAuth();

  const { data, error, isError, isSuccess, isPending } = useProfile(
    userId!,
    Boolean(userId)
  );

  const { mutate, isError: payIsErr } = useInitPayment();

  useLogout(isError, error);

  useEffect(() => {
    if (isError && error?.response?.status !== 401) {
      notif({ c: "red", m: error?.message, t: "Тикеты" });
    }
  }, [isError, error]);

  useEffect(() => {
    if (payIsErr) {
      notif({ c: "red", m: "Не удалось перейти на страницу оплаты" });
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
            У вас {data.tickets} <TicketTool />
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
      <Text size="xs" pt="xs">
        <Highlight
          highlight={["Доната", "Тикетов"]}
          highlightStyles={(theme) => ({
            background: theme.colors.base[1],
            color: "black",
          })}
        >
          *После перевода Доната вы будете возвращены на данную страницу.
          Информация о количестве Тикетов обновляется не сразу.
        </Highlight>
      </Text>
      <Space h="lg" />
      <Space h="lg" />
      <Text
        size="md"
        pt="xs"
        style={(theme) => ({
          borderTop: `1px solid ${theme.colors.base[1]}`,
        })}
      >
        Если при заполнении топ8 вы не нашли желаемого игрока - напишите нам, мы
        оперативно добавим и сделаем его доступным.
      </Text>
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
