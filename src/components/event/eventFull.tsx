import { Stack, Text, Image, Group, Title, Space } from "@mantine/core";
import { FC } from "preact/compat";

import { logoByOrg, showDate } from "./const";
import { IEventsResponse } from "../../api/interface";

export const EventFull: FC<{ ev: IEventsResponse }> = ({ ev }) => {
  return (
    <>
      <Title order={2} c="base.5">
        Ивент
      </Title>
      <Space h="lg" />
      <Stack align="center" gap="xl">
        <Image
          src={logoByOrg[ev.org ?? ""]}
          w="88"
          fallbackSrc="https://placehold.co/300x300?text=Organisator"
        />
        <Group wrap="nowrap" grow>
          <Text size="xl" ta="right" fw={500} style={{ whiteSpace: "nowrap" }}>
            {showDate(ev.startDate)}
          </Text>
          <Text size="md" c="gray.6" style={{ userSelect: "text" }}>
            {ev.info ?? "Нет организаторской информации"}
          </Text>
        </Group>
      </Stack>
    </>
  );
};
