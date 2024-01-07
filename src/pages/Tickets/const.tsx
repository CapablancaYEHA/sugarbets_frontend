import { Text, Pill, Highlight, HoverCard } from "@mantine/core";

export const TicketTool = () => (
  <HoverCard width={140} shadow="md">
    <HoverCard.Target>
      <Pill bg="base.7" c="white">
        Тикетов
      </Pill>
    </HoverCard.Target>
    <HoverCard.Dropdown>
      <Text size="xs">Эквивалент 300₽</Text>
    </HoverCard.Dropdown>
  </HoverCard>
);

export const EventTool = () => (
  <HoverCard width={280} shadow="md">
    <HoverCard.Target>
      <Pill bg="base.7" c="white">
        Ивенту
      </Pill>
    </HoverCard.Target>
    <HoverCard.Dropdown>
      <Text size="xs">
        <Highlight
          highlight={["Ивент", "Тикетов"]}
          highlightStyles={(theme) => ({
            background: theme.colors.base[3],
            color: "white",
          })}
        >
          Участие в ставках на дисциплину возможно, пока длится соответствующий
          Ивент. Заполняете карточку предсказания и заявляете её. Подавать
          заявки можно эквивалентно числу ваших Тикетов
        </Highlight>
      </Text>
    </HoverCard.Dropdown>
  </HoverCard>
);

// const getAmount = (sum) => {
//   const cut = sum - sum * (1 - 0.03);
//   return sum + cut;
// };
