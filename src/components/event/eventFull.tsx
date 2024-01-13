import { Stack, Text, Image, Title, Space } from "@mantine/core";
import { FC } from "preact/compat";

import { logoByOrg, showDate } from "./const";
import { IEventsResponse } from "../../api/interface";
import { linkify } from "../../../utils/linkify";
import styles from "./styles.module.scss";

export const EventFull: FC<{ ev: IEventsResponse }> = ({ ev }) => {
  return (
    <>
      <Title order={2} c="base.5">
        Ивент
      </Title>
      <Space h="lg" />
      <Text size="xl" fw={500} ta="center">
        {ev.eventTitle}
      </Text>
      <Space h="md" />
      <Stack align="center" gap="xl">
        <Image
          src={logoByOrg[ev.org ?? ""]}
          w="88"
          fallbackSrc="https://placehold.co/300x300?text=Organisator"
        />
        <Stack wrap="nowrap" grow align="center">
          <Text size="lg" ta="right" fw={500} style={{ whiteSpace: "nowrap" }}>
            {showDate(ev.tourEnd)}
          </Text>
          <Text
            size="md"
            c="gray.6"
            ta="center"
            dangerouslySetInnerHTML={{
              __html: linkify(ev.info ?? "Нет организаторской информации"),
            }}
            className={styles.info}
          />
        </Stack>
      </Stack>
    </>
  );
};
