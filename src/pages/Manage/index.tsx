import { useState } from "preact/hooks";
import {
  Select,
  LoadingOverlay,
  Box,
  Title,
  Space,
  Button,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useCloseEvent, useEvents, useSingleEvent } from "../../api/queryHooks";
import { isEventStarted } from "../Events/utils";
import { showDate } from "../../components/event/const";
import { EventBet } from "../../components/event/eventBet";
import { prepSbt } from "../Event_Id/utils";
import { useLogout } from "../../../utils/useLogout";

import styles from "./styles.module.scss";
import { notif } from "../../../utils/notif";

export const Manage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState<string | null>(null);
  const { data, error, isError, isPending, isSuccess } = useEvents();
  const currEvents = data?.filter(isEventStarted);
  const { data: singleData, isSuccess: isSingleSucc } = useSingleEvent(
    selected!,
    selected != null
  );

  useLogout(isError, error);

  const {
    data: mutData,
    mutate: calcWin,
    isPending: isMutPen,
    isSuccess: isMutSuc,
  } = useCloseEvent();

  const handleSubmit = (sbmtData) => {
    const { game } = sbmtData;
    calcWin(
      {
        betBody: prepSbt(sbmtData),
        game,
        eventId: selected!,
      },
      {
        onSuccess: () => {
          close();
          notif({ c: "green", m: "Всё посчитано" });
        },
        onError: (e) =>
          notif({
            c: "red",
            m: e?.message,
            t: "Проблема с мастер-ставкой. Возможно в ДБ все-таки появилась запись, а фронт не дождался результатов",
            close: 10000,
          }),
      }
    );
  };

  return (
    <Box className={styles.wrapper} component="section" py="lg">
      <Title order={2}>Админка</Title>
      <Space h="lg" />
      {isSuccess ? (
        <>
          <Select
            label="Текущие ивенты"
            placeholder="Выбрать"
            data={currEvents?.map((a) => ({
              value: a.innerId,
              label: `${a.eventTitle}___ окончание ${showDate(a.tourEnd)}`,
            }))}
            onChange={((_value) => setSelected(_value)) as any}
            clearable
          />
          <EventBet
            opened={opened}
            close={close}
            sbmtCallback={handleSubmit}
            title="Подписать master-bet на ивент"
            loading={isMutPen}
            games={singleData?.games!}
            locale={singleData?.locale}
          />
          {isMutSuc ? (
            <>
              <Space h="lg" />
              <Text size="lg" ta="center" fw={500}>
                Результат: {mutData}
              </Text>
              <Space h="lg" />
            </>
          ) : null}
          <Space h="lg" />
          <Button
            onClick={open}
            style={{ alignSelf: "flex-end" }}
            disabled={!isSingleSucc && selected == null}
            loading={isMutPen}
          >
            Закрыть дисциплину
          </Button>
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
