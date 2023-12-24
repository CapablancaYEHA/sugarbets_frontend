import { Box, Title } from "@mantine/core";
import logo from "./logo.png";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <Box bg="base.5" component="header" h="72" px="xl" className={styles.wrap}>
      <div>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />{" "}
          <Title c="white" order={2}>
            {"Sugarbets".toUpperCase()}
          </Title>
        </div>
        <nav>{/* <a href="/">Home</a> */}</nav>
      </div>
    </Box>
  );
}
