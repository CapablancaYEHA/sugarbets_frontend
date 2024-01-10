import { useEffect, useState } from "preact/hooks";
import { useRoute } from "preact-iso";
import {
  Box,
  LoadingOverlay,
  Space,
  Text,
  Button,
  Title,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useCreateBet, useProfile, useSingleEvent } from "../../api/queryHooks";
import { EventFull } from "../../components/event/eventFull";
import { EventBet } from "../../components/event/eventBet";
import { Pool } from "../../components/event/pool";
import { isEventComing } from "../Events/utils";
import socket from "../../lib/ws_connection";
import { prepSbt } from "./utils";
import { useLogout } from "../../../utils/useLogout";
import { notif } from "../../../utils/notif";
import { EventResult } from "../../components/event/eventResult";
import styles from "./styles.module.scss";

export const EventId = () => {
  const userString = localStorage.getItem("USER") || "";
  const { params } = useRoute();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: userData } = useProfile(userString!, Boolean(userString));
  const tikts = userData?.tickets;
  const { data, isPending, isError, error, isSuccess } = useSingleEvent(
    params.id
  );

  const { mutate, isPending: isMutPen } = useCreateBet();

  useLogout(isError, error);

  useEffect(() => {
    if (isError && error?.response?.status !== 401) {
      notif({ c: "red", m: error?.message, t: "Проблема запроса ивента" });
    }
  }, [isError, error]);

  const [prize, setPrize] = useState({});

  const handleSubmit = (sbmtData) => {
    const { game } = sbmtData;
    mutate(
      {
        betBody: prepSbt(sbmtData),
        game,
        userId: userString,
        eventId: params.id,
      },
      {
        onSuccess: () => {
          close();
          notif({ c: "green", t: "Успешно", m: "Ставка принята" });
        },
        onError: (e) =>
          notif({ c: "red", t: "Ставка не принята", m: e?.message }),
      }
    );
  };

  //   FIXME Тут не хватает условия запуска хуков и сокетов по активности ивента
  useEffect(() => {
    if (isSuccess) {
      setPrize(
        data.prizePool ||
          data.games.reduce((tot, am) => ({ ...tot, [am]: 0 }), {})
      );
    }
  }, [isSuccess, data?.prizePool, data?.games]);

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
          <EventBet
            opened={opened}
            close={close}
            sbmtCallback={handleSubmit}
            loading={isMutPen}
            games={data.games}
            locale={data.locale}
          />
          {isEventComing(data) && data.isActive ? (
            <Text size="sm" c="base.5" fw={500}>
              Ставки на предстоящий ивент пока что не принимаются. Готовьтесь к
              открытию приёма ставок.
            </Text>
          ) : !data.isActive ? (
            <>
              <Text size="sm" c="base.5" fw={500}>
                Ивент уже состоялся. Ставки на него не принимаются.
              </Text>
              <Space h="lg" />
              <Space h="lg" />
              <EventResult ev={data} />
            </>
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
                  <Pool key={ind} game={g} amount={prize?.[g] ?? 0} />
                ))}
              </div>
              <Space h="lg" />
              <Space h="lg" />
              <Space h="lg" />
              <Group justify="end">
                {tikts === 0 ? (
                  <Text size="xs" c="base.9">
                    Без Тикетов на балансе невозможно сделать ставку
                  </Text>
                ) : null}
                <Button
                  onClick={open}
                  loading={isMutPen}
                  disabled={tikts === 0}
                >
                  Предсказать топ8
                </Button>
              </Group>
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
