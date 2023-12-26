import {
  Title,
  Box,
  Text,
  Notification,
  Space,
  Loader,
  Button,
  Pill,
  NumberFormatter,
  HoverCard,
} from "@mantine/core";
import { useEffect } from "preact/hooks";

import { useAuth } from "../../utils/auth-manager";
import { useInitPayment, useUserTickets } from "../api/queryHooks";
import { forceUrl } from "../lib/client";

export const Tickets = () => {
  const { userId, setAuth } = useAuth();
  const { data, error, isError, isSuccess, isPending } = useUserTickets(
    userId!,
    !!userId
  );

  const { mutate, error: payErr, isError: payIsErr } = useInitPayment();

  useEffect(() => {
    if (isError && error?.response?.status === 401) {
      localStorage.removeItem("TOKEN");
      setAuth(false);
    }
  }, [isError, error?.response?.status]);

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
      {isPending ? <Loader size={24} /> : null}
      {isError ? (
        <Notification
          color="red"
          title="Проблема с запросом тикетов"
          withBorder
          withCloseButton={false}
        >
          {error?.message}
        </Notification>
      ) : null}
      {isSuccess ? (
        <>
          <Text size="lg">
            У вас {data}{" "}
            <HoverCard width={280} shadow="md">
              <HoverCard.Target>
                <Pill bg="base.7" c="white">
                  Тикетов
                </Pill>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="xs">
                  Здесь должна быть инфа о том, что это за сущность такая, этот
                  ваш тикет
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Text>
          <Space h="md" />
          <Text size="md">
            Внесите донат на <NumberFormatter suffix="₽ " value={300} /> и
            получите <Pill c="base.5">Тикет</Pill> на эквивалентную сумму.{" "}
            <Pill c="base.5">Тикет</Pill> может быть заполнен и применен к любой{" "}
            <HoverCard width={280} shadow="md">
              <HoverCard.Target>
                <Pill bg="base.7" c="white">
                  Лотерее
                </Pill>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="xs">Про лотерею тоже надо написать</Text>
              </HoverCard.Dropdown>
            </HoverCard>
            , и таким образом пополнит её общий призовой фонд.
          </Text>
          <Space h="xl" />
          <Button
            variant="filled"
            fullWidth={false}
            onClick={() => forceUrl(userId!)}
            style={{ width: "min-content" }}
          >
            Получить тикет
          </Button>
        </>
      ) : null}
      <Space h="lg" />
      <Text size="xs" style={{ margin: "32px 0 0 0" }}>
        Сейчас поставил сумму перевода 2р для тестов. В боевой версии предлагаю
        указать в стиле:
        <br />
        <i>
          Итоговая сумма составит: эквивалент тикета 300р, + 50р сбор Sugarbets
          + комиссия сервиса = {getAmount(350)}
        </i>
        <br />
        То есть комиссию сервиса тоже чел оплачивает, в итоге я получаю на
        кошель 350р ровно.
      </Text>
      <Space h="lg" />
      {payIsErr ? (
        <Notification
          color="red"
          title="Проблема оплаты"
          withBorder
          withCloseButton={false}
        >
          {payErr?.message}
        </Notification>
      ) : null}

      <Text size="xs" style={{ margin: "auto 0 0 0" }}>
        * Если при взаимодействии со страницами, вас выкинуло на Вход - это
        значит, что ваша сессия истекла и необходимо залогиниться заново.
      </Text>
    </Box>
  );
};

const getAmount = (sum) => {
  const cut = sum - sum * (1 - 0.03);
  return sum + cut;
};
