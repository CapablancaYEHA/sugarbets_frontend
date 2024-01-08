import { FC, Fragment } from "preact/compat";
import { Table, Space, Text, Group, Title } from "@mantine/core";
import { isEmpty, uniq } from "lodash-es";

import { IEventsResponse } from "../../api/interface";
import { titleByGame } from "./const";

export const EventResult: FC<{ ev: IEventsResponse }> = ({ ev }) => {
  const { masterBetbody, winners } = ev;
  const isShow =
    !isEmpty(masterBetbody) &&
    masterBetbody != null &&
    !isEmpty(winners) &&
    winners != null;
  const checkArr = Object.keys(titleByGame);

  return isShow ? (
    <>
      <Title order={3} style={{ textAlign: "center" }}>
        Результаты, победители
      </Title>
      <Space h="lg" />
      {checkArr.map((a, ind) =>
        masterBetbody[a] != null && winners[a] != null ? (
          <Fragment key={ind}>
            <Group
              wrap="nowrap"
              maw="100%"
              w="100%"
              miw={0}
              justify="space-around"
            >
              <Text size="xl" fw="500" c="base.7">
                {titleByGame[a]}
              </Text>
              <Table striped gap="xl" maw="300px">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Место</Table.Th>
                    <Table.Th>Игрок</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {Object.entries(masterBetbody?.[a])?.map(
                    ([key, val], index) => {
                      return Array.isArray(val) ? (
                        val.map((m, inx) => (
                          <Table.Tr key={m}>
                            <Table.Td c="base.7" fw="500">
                              {key[inx]}
                            </Table.Td>
                            <Table.Td>{m}</Table.Td>
                          </Table.Tr>
                        ))
                      ) : (
                        <Table.Tr key={`${index}_${val}`}>
                          <Table.Td c="base.7" fw="500">
                            {key}
                          </Table.Td>
                          <Table.Td>{val}</Table.Td>
                        </Table.Tr>
                      );
                    }
                  )}
                </Table.Tbody>
              </Table>
              <Text size="xl" fw="500">
                {uniq(winners[a].split(",")).join(", ")}
              </Text>
            </Group>
            <Space h="xl" />
          </Fragment>
        ) : null
      )}
    </>
  ) : (
    <Title order={3} style={{ textAlign: "center" }}>
      Ожидается внесение результатов
    </Title>
  );
};
