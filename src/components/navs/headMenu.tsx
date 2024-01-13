import { Menu, Button, Space, Stack, Text, Loader } from "@mantine/core";
import { FC } from "preact/compat";
import { useInitPayment, useProfile } from "../../api/queryHooks";

interface IProps {
  id: string;
}

export const HeadMenu: FC<IProps> = ({ id }) => {
  const { data, isSuccess, isPending } = useProfile(id, Boolean(id));

  const { mutate } = useInitPayment();

  const logout = () => {
    localStorage.removeItem("TOKEN");
    window.location.reload();
  };

  return (
    <Menu
      shadow="md"
      width={164}
      transitionProps={{ transition: "rotate-left", duration: 150 }}
      trigger="hover"
      loop={false}
      withinPortal={false}
      trapFocus={false}
      menuItemTabIndex={0}
      position="bottom-end"
      offset={6}
      withArrow
      arrowPosition="center"
    >
      <Menu.Target>
        <Button variant="subtle" color="white">
          Меню
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack px="xs" gap="0">
          {isPending ? (
            <Loader color="base.5" size="xs" />
          ) : isSuccess ? (
            <>
              <Text fw={500} c="base.7">
                {data.userName}
              </Text>
              <Text size="xs">Тикеты: {data.tickets}</Text>
              <Space h="4px" />
              <Button
                variant="light"
                fullWidth={false}
                size="xs"
                onClick={() =>
                  mutate(id!, {
                    onSuccess: (res) => (window.location.href = res),
                  })
                }
                style={{ width: "min-content" }}
                h="20px"
                fw="400"
                px="6px"
              >
                добавить
              </Button>
            </>
          ) : null}
        </Stack>
        <Space h="xs" />
        <Menu.Divider />
        <Menu.Item href="/events" component="a">
          Ивенты
        </Menu.Item>
        <Menu.Item href="/bets" component="a">
          Ставки
        </Menu.Item>
        {data?.role === "admin" ? (
          <Menu.Item href="/manage" component="a">
            Админка
          </Menu.Item>
        ) : null}
        <Menu.Divider />
        <Menu.Item onClick={logout}>Выйти</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
