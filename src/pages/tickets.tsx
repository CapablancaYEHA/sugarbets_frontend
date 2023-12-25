import {
  Title,
  Box,
  Text,
  Notification,
  Space,
  Loader,
  Button,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "preact/hooks";

import { useAuth } from "../../utils/auth-manager";
import { useUserTickets } from "../api/queryHooks";

export const Tickets = () => {
  const { userId, setAuth } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, error, isError, isSuccess, isPending } = useUserTickets(
    userId!,
    !!userId
  );

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
          <Text size="lg">У вас {data} тикетов</Text>
          <Space h="md" />
          <Text size="md">
            Сделайте донат на 300р и получите Тикет, который можно использовать
            в Лотерее
          </Text>
          <Space h="md" />
          <Button
            variant="filled"
            loading={isPending}
            fullWidth={false}
            onClick={open}
            style={{ width: "min-content" }}
          >
            Получить тикет
          </Button>
          <Modal opened={opened} onClose={close} title="Получение тикета">
            Здесь будет какой-то виджет для оплаты, и все такое прочее
          </Modal>
        </>
      ) : null}

      <Text size="xs" style={{ margin: "auto 0 0 0" }}>
        * Если при взаимодействии со страницами, вас выкинуло на Вход - это
        значит, что ваша сессия истекла и необходимо залогиниться заново.
      </Text>
    </Box>
  );
};
