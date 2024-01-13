import { FC, Fragment } from "preact/compat";
import { Stack, Space, Text, Group, Title } from "@mantine/core";
import { isEmpty, uniq } from "lodash-es";

import { IEventsResponse } from "../../api/interface";
import { titleByGame } from "./const";
import { ResultTable } from "./resultTable";

interface IProp {
  ev: IEventsResponse;
}
export const EventResult: FC<IProp> = ({ ev }) => {
  const { masterBetbody, winners } = ev;

  const isShowRes =
    !isEmpty(masterBetbody) &&
    masterBetbody != null &&
    !isEmpty(winners) &&
    winners != null;
  const checkArr = Object.keys(titleByGame);

  return isShowRes ? (
    <>
      <Title order={3} style={{ textAlign: "center" }}>
        Результаты турнира
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
              gap="xs"
            >
              <Text
                size="xl"
                fw="500"
                ta="center"
                c="base.7"
                style={{ flex: "1 1 100%" }}
              >
                {titleByGame[a]}
              </Text>
              <ResultTable maw="300px" betBody={masterBetbody?.[a]} />
              <Stack style={{ flex: "1 1 100%" }}>
                <Text size="xl" fw="500" ta="center" c="base.7">
                  Победители ставок
                </Text>
                <Text size="md" fw="500" ta="center">
                  {uniq(winners[a].split(",")).join(", ")}
                </Text>
              </Stack>
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
