import { Box, Anchor } from "@mantine/core";
import styles from "./styles.module.scss";

export function Footer() {
  return (
    <Box
      bg="base.5"
      component="footer"
      px="xl"
      className={styles.wrap}
      style={{ justifyContent: "flex-end" }}
    >
      <div>
        <Anchor
          href="/terms"
          underline="never"
          c="white"
          inline
          size="xs"
          style={{ fontWeight: 500, margin: "0 0 0 auto" }}
        >
          СОГЛАШЕНИЕ
        </Anchor>
      </div>
    </Box>
  );
}
