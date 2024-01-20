import { Text, Group } from "@mantine/core";

import userDisc from "../../assets/user_discord.png";
import userKing from "../../assets/user_king.png";
import styles from "./styles.module.scss";

const imgByUser = {
  kingusha: userKing,
  "arslan ash": userDisc,
};

export const IntroUser = ({ children, user, c = "" }) => {
  return (
    <Group gap="sm" align="start" wrap="nowrap">
      <div
        className={styles.avatar}
        style={{
          backgroundImage: `url(${imgByUser[user.toLowerCase()]})`,
        }}
      />
      <div>
        <Group gap="sm" align="baseline">
          <Text size="md" className={styles.user} lh={1} c={c} fw={600}>
            {user}
          </Text>
          <Text size="xs" c="gray">
            Сегодня в 7:32
          </Text>
        </Group>
        {children}
      </div>
    </Group>
  );
};
