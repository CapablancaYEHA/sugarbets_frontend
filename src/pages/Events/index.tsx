import { useEffect } from "preact/hooks";
import { Box, Title, LoadingOverlay, Space, Text } from "@mantine/core";

import { useEvents } from "../../api/queryHooks";
import { useAuth } from "../../../utils/auth-manager";
import { EventPreview } from "../../components/event/eventPreview";
import { isEventComing, isEventStarted, sortByAsc } from "./utils";

import styles from "./styles.module.scss";

export const Events = () => {
  const { setAuth } = useAuth();

  const { data, error, isError, isPending } = useEvents();

  const sorted = (data ?? [])?.sort(sortByAsc);
  const pastEvents = sorted?.filter((a) => !a.isActive);
  const currEvents = sorted?.filter(isEventStarted);
  const comingEvents = sorted?.filter(isEventComing).map((c) => ({
    ...c,
    isComing: true,
  }));

  useEffect(() => {
    if (isError && error?.response?.status === 401) {
      localStorage.removeItem("TOKEN");
      setAuth(false);
    }
  }, [isError, error?.response?.status]);

  return (
    <Box className={styles.wrapper} component="section" py="lg">
      <Title order={2}>Эвенты</Title>
      <Space h="lg" />
      <Title order={3}>Активные</Title>
      <Space h="md" />
      {currEvents.length ? (
        currEvents.map((a) => <EventPreview key={a.innerId} ev={a} />)
      ) : (
        <Text size="md">Нет активных Эвентов</Text>
      )}
      <Space h="xl" />
      <Title order={3}>Предстоящие</Title>
      <Space h="md" />
      {comingEvents.length ? (
        comingEvents.map((a) => (
          <a key={a.innerId} href={`/events/${a.innerId}`}>
            🎄 {a.eventTitle}
          </a>
        ))
      ) : (
        <Text size="md">Нет предстоящих</Text>
      )}

      <Box mt="auto">
        <Title order={3}>Архив событий</Title>
        <Space h="md" />
        {pastEvents.length ? (
          pastEvents.map((a) => (
            <a key={a.innerId} href={`/events/${a.innerId}`}>
              ❄️ {a.eventTitle}
            </a>
          ))
        ) : (
          <Text size="md">Нет Эвентов в архиве</Text>
        )}
      </Box>
      <LoadingOverlay
        visible={isPending}
        zIndex={30}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
};
