import { FC } from "preact/compat";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  Button,
  Table,
  Loader,
  Space,
  Text,
  Radio,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateBet, usePlayers } from "../../api/queryHooks";
import { betDraftArr, prepSbt, schema, tableTdByIndex } from "./const";
import { Dropdown } from "../dropdown/Dropdown";

interface IProp {
  opened: boolean;
  close: () => void;
  eventId: string;
}
export const EventBet: FC<IProp> = ({ opened, close, eventId }) => {
  const userString = localStorage.getItem("USER") || "";
  const { data, isSuccess, isPending } = usePlayers();
  const { mutate } = useCreateBet();
  const { register, handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { game: "T8" },
  });

  const onClose = () => {
    reset();
    close();
  };

  const onSubmit = (sbmtData) => {
    const { game } = sbmtData;
    mutate(
      {
        betBody: prepSbt(sbmtData),
        game,
        userId: userString,
        eventId,
      },
      {
        onSuccess: () => {
          onClose();
          notifications.show({
            title: "Успешно",
            message: "Ставка принята",
            color: "green",
            autoClose: 5000,
            withBorder: true,
          });
        },
        onError: (e) =>
          notifications.show({
            title: "Ставка не принята",
            message: e?.message,
            color: "red",
            autoClose: 5000,
            withBorder: true,
          }),
      }
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="lg" fw="500">
          Ставка на топ8
        </Text>
      }
      centered
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      {isPending ? <Loader /> : null}
      {isSuccess ? (
        <>
          <Radio
            {...register("game", {
              required: true,
            })}
            label="Tekken 8"
            value="T8"
            size="xs"
          />
          <Space h="lg" />
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Место</Table.Th>
                <Table.Th>Игрок</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
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
            loading={isPending}
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
