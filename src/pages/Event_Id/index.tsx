import { useEffect, useState } from "preact/hooks";
import { useRoute } from "preact-iso";
import { Box, LoadingOverlay, Space, Text, Button, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

import { useAuth } from "../../../utils/auth-manager";
import { useSingleEvent } from "../../api/queryHooks";
import { EventFull } from "../../components/event/eventFull";
import { EventBet } from "../../components/event/eventBet";
import { isEventComing } from "../Events/utils";
import socket from "../../lib/ws_connection";

import styles from "./styles.module.scss";
import { Pool } from "../../components/event/pool";
import axios from "axios";

export const EventId = () => {
  const { setAuth } = useAuth();
  const { params } = useRoute();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isPending, isError, error, isSuccess } = useSingleEvent(
    params.id
  );

  useEffect(() => {
    if (isError) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("TOKEN");
        setAuth(false);
      } else {
        notifications.show({
          title: "Проблема запроса эвента",
          message: error?.message,
          color: "red",
          autoClose: 5000,
          withBorder: true,
        });
      }
    }
  }, [isError, error]);

  const [prize, setPrize] = useState({});

  //   FIXME Тут не хватает условия запуска хуков и сокетов по активности эвента
  useEffect(() => {
    if (isSuccess) {
      setPrize(data?.prizePool);
    }
  }, [isSuccess, data?.prizePool]);

  useEffect(() => {
    socket.emit("eventPageVisit", {
      eventId: params.id,
    });

    return () => {
      socket.emit("eventPageLeave", {
        eventId: params.id,
      });
    };
  }, [params.id]);

  useEffect(() => {
    socket.on("betUpdateResponse", (payload) => {
      setPrize((s) => ({
        ...s,
        [payload.game]: payload.updVal,
      }));
    });
  }, []);

  return (
    <Box
      component="section"
      py="lg"
      style={{
        display: "flex",
        margin: "0 auto",
        flexFlow: "column nowrap",
      }}
    >
      {isSuccess ? (
        <>
          <EventFull ev={data} />
          <Space h="lg" />
          <EventBet opened={opened} close={close} eventId={params.id} />
          {isEventComing(data) && data.isActive ? (
            <Text size="sm" c="red">
              Эвент еще только ожидается. Ставки на него пока что не
              принимаются.
            </Text>
          ) : !data.isActive ? (
            <Text size="sm" c="red">
              Эвент уже состоялся. Ставки на него не принимаются.
            </Text>
          ) : (
            <>
              <Space h="lg" />
              <Space h="lg" />
              <Title order={2} ta="center" fw="500">
                Текущий призовой фонд дисциплин
              </Title>
              <Space h="lg" />
              <div className={styles.pool}>
                {data.games?.map((g, ind) => (
                  <Pool key={ind} game={g} amount={prize[g]} />
                ))}
              </div>
              <Space h="lg" />
              <Space h="lg" />
              <Space h="lg" />
              <Button onClick={open} style={{ alignSelf: "flex-end" }}>
                Предсказать топ8
              </Button>
            </>
          )}
        </>
      ) : null}
      <LoadingOverlay
        visible={isPending}
        zIndex={30}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
};
