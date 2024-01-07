import { Box, Title } from "@mantine/core";

import { useAuth } from "../../../utils/auth-manager";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.png";
import { HeadMenu } from "./headMenu";

export function Header() {
  const { isAuth, userId } = useAuth();

  return (
    <Box bg="base.5" component="header" h="72" px="xl" className={styles.wrap}>
      <div>
        <a href="/" className={styles.logo}>
          <img src={logo} alt="logo" />
          <Title c="white" order={4}>
            {"Sugarbets".toUpperCase()}
          </Title>
        </a>
        {isAuth ? (
          <nav
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: "24px",
            }}
          >
            <HeadMenu id={userId!} />
          </nav>
        ) : null}
      </div>
    </Box>
  );
}
