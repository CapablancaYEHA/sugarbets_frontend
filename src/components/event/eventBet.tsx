import { FC } from "preact/compat";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Modal,
  Button,
  Table,
  Space,
  Text,
  Radio,
  Group,
  Skeleton,
} from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";

import { Dropdown } from "../dropdown/Dropdown";
import { usePlayers } from "../../api/queryHooks";
import { betDraftArr, schema, tableTdByIndex, titleByGame } from "./const";

interface IProp {
  opened: boolean;
  close: () => void;
  sbmtCallback: (arg: any) => void;
  title?: string;
  loading?: boolean;
  games: string[] | null;
  locale?: "RU" | "INT";
}
export const EventBet: FC<IProp> = ({
  opened,
  close,
  sbmtCallback,
  title = "Ставка на топ8",
  loading,
  games,
  locale = "RU",
}) => {
  const { register, handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { game: "T8" },
  });
  const curGame = useWatch({ control, name: "game", defaultValue: "T8" });

  const { data, isSuccess, isPending } = usePlayers(curGame, locale);

  const onClose = () => {
    reset();
    close();
  };

  const onSubmit = (sbmtData) => {
    sbmtCallback(sbmtData);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="lg" fw="500">
          {title}
        </Text>
      }
      centered
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      {isPending ? <Skeleton height={550} /> : null}
      {isSuccess ? (
        <>
          <Group>
            {games?.map((g, ind) => (
              <Radio
                {...register("game", {
                  required: true,
                })}
                key={`${g}_${ind}`}
                label={titleByGame[g]}
                value={g}
                size="xs"
              />
            ))}
          </Group>
          <Space h="lg" />
          <Table striped disabled>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Место</Table.Th>
                <Table.Th>Игрок</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody disabled>
              {betDraftArr.map((a, ind) => (
                <Table.Tr key={ind + 1}>
                  <Table.Td c="base.7" fw="500">
                    {tableTdByIndex[ind + 1]}
                  </Table.Td>
                  <Table.Td>
                    <Controller
                      control={control}
                      key={ind + 1}
                      // @ts-ignore
                      name={`${ind + 1}`}
                      defaultValue={undefined}
                      render={({
                        field: { onChange },
                        fieldState: { error: fieldErr },
                      }) => (
                        <Dropdown
                          onSelect={onChange}
                          items={data}
                          id={ind + 1}
                          error={fieldErr?.message}
                        />
                      )}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Space h="xl" />
          <Button
            variant="light"
            onClick={handleSubmit(onSubmit, undefined)}
            loading={isPending || loading}
            fullWidth={false}
            style={{
              width: "min-content",
              display: "block",
              margin: "0 12px 0 auto",
            }}
          >
            Отправить
          </Button>
        </>
      ) : null}
    </Modal>
  );
};
