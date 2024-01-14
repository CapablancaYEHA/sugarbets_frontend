import { Combobox, Group, Pill } from "@mantine/core";
import { Virtuoso } from "react-virtuoso";

export const VirtList = ({ list }) => (
  <Virtuoso
    style={{ height: list.length * 35 }}
    totalCount={list.length}
    itemContent={(index) => {
      const elem = list[index];
      return (
        <Combobox.Option value={elem.nick}>
          <Group justify="space-between">
            <span>{elem.nick}</span>
            <Pill bg="base.3" c="white" size="xs" radius="sm">
              {elem.country}
            </Pill>
          </Group>
        </Combobox.Option>
      );
    }}
  />
);
