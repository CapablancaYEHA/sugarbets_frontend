import { Stack, Text } from "@mantine/core";
import { FC } from "preact/compat";

import { showDate } from "./const";
import { IEventsResponse } from "../../api/interface";

export const EventFull: FC<{ ev: IEventsResponse }> = ({ ev }) => {
  return (
    <Stack>
      <Text size="md" fw={500}>
        {showDate(ev.startDate)}
      </Text>
      <Text size="sm" c="gray.6">
        {ev.info ?? ""}
      </Text>
    </Stack>
  );
};
