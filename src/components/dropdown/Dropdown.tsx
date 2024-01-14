import { useState } from "preact/hooks";
import { FC } from "preact/compat";
import { Combobox, InputBase, useCombobox, Input } from "@mantine/core";
import { IPlayersResponse } from "../../api/interface";
import { VirtList } from "./VirtList";
import styles from "./styles.module.scss";

interface IProp {
  items: IPlayersResponse[];
  id: string | number;
  onSelect: (a) => void;
  error?: string;
}
export const Dropdown: FC<IProp> = ({ items, id, onSelect, error }) => {
  const [search, setSearch] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch("");
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const [value, setValue] = useState<string | null>(null);

  const filtered = items?.filter((item) =>
    item?.nick?.toLowerCase().includes(search?.toLowerCase()?.trim())
  );

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        onSelect(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          error={error}
        >
          {value || <Input.Placeholder>Игрок</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Поиск по игрокам"
          id={`search_players_${id}`}
        />
        <Combobox.Options mah={200} className={styles.scrollbox}>
          {filtered.length > 0 ? (
            <VirtList list={filtered} />
          ) : (
            <Combobox.Empty>Нет совпадений</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
