import { Box, Title, Button } from "@mantine/core";

import { useAuth } from "../../../utils/auth-manager";
import styles from "./styles.module.scss";
import logo from "./logo.png";

export function Header() {
  const { isAuth } = useAuth();

  const logout = () => {
    localStorage.removeItem("TOKEN");
    window.location.reload();
  };

  return (
    <Box bg="base.5" component="header" h="72" px="xl" className={styles.wrap}>
      <div>
        <a href="/" className={styles.logo}>
          <img src={logo} alt="logo" />{" "}
          <Title c="white" order={2}>
            {"Sugarbets".toUpperCase()}
          </Title>
        </a>
        {isAuth ? (
          <nav
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="subtle"
              color="white"
              onClick={logout}
              fullWidth={false}
            >
              Выйти
            </Button>
          </nav>
        ) : null}
      </div>
    </Box>
  );
}
