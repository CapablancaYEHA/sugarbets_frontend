import { FC } from "preact/compat";
import { useLocation } from "preact-iso";
import { Image, Stack, Text, Button } from "@mantine/core";

import { IEventsResponse } from "../../api/interface";
import { logoByGame, logoByOrg, showDate } from "./const";
import styles from "./styles.module.scss";

export const EventPreview: FC<{ ev: IEventsResponse }> = ({ ev }) => {
  const location = useLocation();
  return (
    <div className={styles.box}>
      <section>
        <div>
          <Image
            src={logoByOrg[ev.org ?? ""]}
            w="88"
            fallbackSrc="https://placehold.co/300x300?text=No_logo"
          />
        </div>
        <Stack>
          <Text size="md" fw={500}>
            {showDate(ev.startDate)}
          </Text>
          <Text size="sm" c="gray.6">
            {ev.info ?? ""}
          </Text>
        </Stack>
        <div>
          <Image
            src={logoByGame[ev.games?.[0] ?? "default"]}
            fallbackSrc="https://placehold.co/440x120?text=No_games"
          />
        </div>
      </section>
      <Button
        variant="outline"
        fullWidth={false}
        mt="xl"
        onClick={() => location.route(`/events/${ev.innerId}`)}
      >
        К эвенту
      </Button>
    </div>
  );
};
