import { FC } from "preact/compat";
import { Table, Image, Space, Stack } from "@mantine/core";
import { IBetBod } from "../../api/interface";
import { logoByGame } from "./const";

interface IProp {
  betBody: IBetBod;
  maw?: string;
  game?: string;
}

export const ResultTable: FC<IProp> = ({ betBody, maw, game }) => (
  <>
    {game ? (
      <Stack align="center">
        <Image
          src={logoByGame[game]}
          fallbackSrc="https://placehold.co/440x120?text=Game_logo"
          w={144}
        />
        <Space h="xs" />
      </Stack>
    ) : null}

    <Table striped gap="xl" maw={maw}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Место</Table.Th>
          <Table.Th>Игрок</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.entries(betBody)?.map(([key, val], index) => {
          return Array.isArray(val) ? (
            <Table.Tr key={`${index}_${val.join("_")}`}>
              <Table.Td c="base.7" fw="500">
                {key.split("").join("-")}
              </Table.Td>
              <Table.Td>{val.join(", ")}</Table.Td>
            </Table.Tr>
          ) : (
            <Table.Tr key={`${index}_${val}`}>
              <Table.Td c="base.7" fw="500">
                {key}
              </Table.Td>
              <Table.Td>{val}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  </>
);
