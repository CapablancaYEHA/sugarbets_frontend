import { Fragment } from "preact/compat";
import { Box, Title, LoadingOverlay, Space, Text } from "@mantine/core";

import { useEvents } from "../../api/queryHooks";
import { EventPreview } from "../../components/event/eventPreview";
import { EventOneLine } from "../../components/event/eventOneLine";
import { isAbleToBet, isWaitResults, sortByAsc } from "./utils";
import { useLogout } from "../../../utils/useLogout";
import styles from "./styles.module.scss";

export const Events = () => {
  const { data, error, isError, isPending } = useEvents();

  const sorted = (data ?? [])?.sort(sortByAsc);
  const pastEvents = sorted?.filter((a) => !a.isActive);
  const currEvents = sorted?.filter(isAbleToBet);
  const waitEvents = sorted?.filter(isWaitResults);

  useLogout(isError, error);

  return (
    <Box className={styles.wrapper} component="section" py="lg">
      <Title order={2}>Ивенты</Title>
      <Space h="lg" />
      <Title order={4}>Доступны к ставкам</Title>
      <Space h="md" />
      {currEvents.length ? (
        currEvents.map((a, ind) => (
          <Fragment key={a.innerId}>
            <EventPreview ev={a} />
            {ind !== currEvents.length - 1 ? <Space h="lg" /> : null}
          </Fragment>
        ))
      ) : (
        <Text size="md">Нет активных Ивентов</Text>
      )}
      <Space h="xl" />

      <Box mt="auto">
        {waitEvents.length ? (
          <>
            <Title order={4}>Ожидают результатов</Title>
            {waitEvents.map((a) => (
              <EventOneLine key={a.innerId} ev={a} />
            ))}
            <Space h="xl" />
          </>
        ) : null}
        <Title order={4}>Архив событий</Title>
        <Space h="md" />
        {pastEvents.length ? (
          pastEvents.map((a) => <EventOneLine key={a.innerId} ev={a} />)
        ) : (
          <Text size="md">Нет Ивентов в архиве</Text>
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
