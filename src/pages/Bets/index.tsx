import { useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import { Text, LoadingOverlay, Box, Title, Space, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLogout } from "../../../utils/useLogout";
import {
  showDateWhours,
  showDate,
  titleByGame,
} from "../../components/event/const";
import { BetSingle } from "../../components/bet/betSIngle";
import { useEvents, useUserBets } from "../../api/queryHooks";

import styles from "./styles.module.scss";

export const Bets = () => {
  const location = useLocation();
  const id = localStorage.getItem("USER") || "";
  const [betId, setBet] = useState<string | undefined>(undefined);
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isPending, isError, error, isSuccess } = useUserBets(
    id,
    Boolean(id)
  );
  const { data: evData } = useEvents();
  useLogout(isError, error);

  const evInfo = evData?.reduce(
    (tot, am) => ({ ...tot, [am.innerId]: [am.eventTitle, am.tourEnd] }),
    {}
  );

  return (
    <Box className={styles.wrapper} component="section" py="lg">
      <Title order={2}>Ваши ставки</Title>
      <Space h="lg" />
      {isSuccess && data.length > 0 ? (
        <>
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th fw={500}>Ивент</Table.Th>
                <Table.Th fw={500}>Игра</Table.Th>
                <Table.Th fw={500}>Дата ставки</Table.Th>
                <Table.Th> </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((b) => (
                <Table.Tr key={b.innerId}>
                  <Table.Td>
                    <span
                      className={styles.link}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        location.route(`/events/${b.forEventName[0]}`)
                      }
                    >
                      {evInfo?.[b.forEventName[0]][0]}
                    </span>{" "}
                    / {showDate(evInfo?.[b.forEventName[0]][1])}
                  </Table.Td>
                  <Table.Td>{titleByGame[b.game]}</Table.Td>
                  <Table.Td>{showDateWhours(b.dateCreated)}</Table.Td>
                  <Table.Td
                    onClick={() => {
                      open();
                      setBet(b.innerId);
                    }}
                    className={styles.link}
                  >
                    Подробнее
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <BetSingle
            opened={opened && betId != null}
            close={close}
            id={betId!}
          />
        </>
      ) : (
        <Text size="md">Нет ставок</Text>
      )}

      <LoadingOverlay
        visible={isPending}
        zIndex={30}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
};
