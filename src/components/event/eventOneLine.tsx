import { Anchor, Group, Text } from "@mantine/core";
import { FC } from "preact/compat";

import { IEventsResponse } from "../../api/interface";
import { showDate, titleByGame } from "./const";

export const EventOneLine: FC<{ ev: IEventsResponse }> = ({ ev }) => {
  return (
    <Anchor href={`/events/${ev.innerId}`} inherit underline="never">
      <Group gap="xl" wrap="nowrap" align="baseline">
        <Text miw={110}>{ev.eventTitle}</Text>
        <Text miw={110}>{showDate(ev.startDate)}</Text>
        <Text>{ev.games?.map((a) => titleByGame[a]).join(", ")}</Text>
      </Group>
    </Anchor>
  );
};
