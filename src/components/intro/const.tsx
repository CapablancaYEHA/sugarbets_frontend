import {
  Button,
  Stack,
  Text,
  HoverCard,
  Pill,
  Highlight,
  Space,
  Radio,
  Table,
  Title,
  Box,
} from "@mantine/core";
import { EventPreview } from "../event/eventPreview";
import { Dropdown } from "../dropdown/Dropdown";
import { Pool } from "../event/pool";

import logo from "../../assets/logo_org_example.png";
import styles from "./styles.module.scss";

export const TicketTool = () => (
  <HoverCard width={140} shadow="md">
    <HoverCard.Target>
      <Pill bg="base.7" c="white">
        Тикет
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

export const arsSpeech =
  "Приветствую всех в этом уютном дискорде. Череда побед объединила жизнь в один нескончаемый день. Хочется найти себе небольшое развлечение, получить эндорфины иного рода, пощекотать нервишки. Я подумал, что русский народ - с его широкой душой и насыщенной историей - должен знать, и решил к вам обратиться за помощью. Кто тут у вас самый мудрый и понимающий тонкую духовную организацию человека?";

export const kingSpeech =
  "Арслан, братан, могу посоветовать тебе способ нагнать хайпа на любимую дисциплину + привнести в жизнь немного гэмблинга —\nСтавки внутри коммунити!\nНужно проявить навыки аналитического мышления и предсказать топ-8 турнира\nКратко поясняю по пунктам:";

const SlideWrap = ({ children }) => (
  <Stack gap="xs" px="xl" py="sm" className={styles.slide}>
    {children}
    <Space value="xl" />
    <Space value="xl" />
  </Stack>
);

export const contSlide1 = (
  <>
    <Text size="sm">
      Для начала нужно приобрести <TicketTool />. Его можно заполнить и
      применить к любому <EventTool />, таким образом пополнив призовой фонд
      отдельно взятой дисциплины
    </Text>
    <Text size="sm">
      <Highlight
        highlight={["Меню", "Тикетов"]}
        highlightStyles={(theme) => ({
          background: theme.colors.base[3],
          color: "white",
        })}
      >
        Залогинившись, вызови в хедере Меню и воспользуйся кнопкой
      </Highlight>
    </Text>
    <Button
      variant="light"
      fullWidth={false}
      size="xs"
      onClick={() => undefined}
      style={{ width: "min-content", margin: "0 auto" }}
      h="20px"
      fw="400"
      px="6px"
    >
      добавить
    </Button>
    <Text size="sm">
      После оплаты на странице Юmoney ты сможешь вернуться на сайт, к этому
      моменту баланс Тикетов уже должен обновиться.
    </Text>
  </>
);

export const slide1 = <SlideWrap>{contSlide1}</SlideWrap>;

const mockEvent = {
  eventTitle: "Tekken World Tour LCQ",
  games: ["T8"],
  info: "USA, LA. Сетка: https://www.start.gg/tournament/tekken-world-tour-2023-global-finals/details\nСтрим: https://www.twitch.tv/tekken",
  innerId: "reck50PigEHBzlcoF",
  org: "TWT2023",
  orgPic: [{ url: logo }],
  startDate: "2024-01-07T06:00:00.000Z",
  tourEnd: "2024-01-16T16:30:00.000Z",
};

const mockPlayers = [
  {
    nick: "Unknown",
    country: "RU",
  },
  {
    nick: "Завсегдатай",
    country: "US",
  },
  {
    nick: "Олдфаг",
    country: "RU",
  },
];

export const contSlide2 = (
  <>
    <Text size="sm">Найди интересующий тебя Ивент и перейди к его деталям</Text>
    <EventPreview ev={mockEvent as any} hasB={false} />
    <Text size="sm">
      Помимо активных Ивентов, на которые принимаются ставки прямо сейчас, в
      списке буду представлены уже завершенные события с подведенными итогами
    </Text>
  </>
);

export const slide2 = <SlideWrap>{contSlide2}</SlideWrap>;

export const contSlide3 = (
  <>
    <Text size="sm">В самом Ивенте найди кнопку</Text>
    <Button
      onClick={undefined}
      style={{ width: "min-content", margin: "0 auto" }}
    >
      Предсказать топ8
    </Button>
    <Text size="sm">
      В открывшейся модалке нужно выбрать игровую дисциплину текущего Ивента. На
      топ-8 по этой игре ты и будешь делать ставку. Кроме того, от игры зависит
      доступный пул игроков к заявке. В выпадающем списке начни вводить нужное
      имя - увидишь подходящие варианты по совпадению.
    </Text>
    <Stack align="center">
      <Radio key={"game1"} label={"Дисциплина 1"} value={"game1"} size="xs" />
      <Table striped maw={300}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Место</Table.Th>
            <Table.Th>Игрок</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td c="base.7" fw="500">
              ...
            </Table.Td>
            <Table.Td>...</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td c="base.7" fw="500">
              3
            </Table.Td>
            <Table.Td>
              <Dropdown
                onSelect={() => undefined}
                items={mockPlayers}
                id={"kek1"}
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Stack>
    <Text size="sm">
      Кстати, если в базе отсутствует желанный тебе игрок - свяжись с нами - мы
      оперативно добавим
    </Text>
  </>
);

export const slide3 = <SlideWrap>{contSlide3}</SlideWrap>;

const mockPool = {
  T8: 9300,
  SF6: 15000,
};

export const contSlide4 = (
  <>
    <Text size="sm">
      После того, как ты успешно отправил свою ставку, с твоего баланса спишется
      1 Тикет. Далее тебе остается только дождаться:
    </Text>
    <Text size="sm">
      1. Закрытия ставок на Ивент. Это происходит в дату, объявленную в
      информации о событии как дата самого Ивента. То есть, перед началом
      отыгрыша топ-8 на турнире, ставки уже не принимаются
    </Text>
    <Box py="sm">
      <Text size="sm" c="base.5" fw={500} ta="center">
        Ивент уже состоялся. Ставки на него не принимаются.
      </Text>
      <Space h="xs" />
      <Title order={4} ta="center" fw="500">
        Итоговый призовой фонд
        <Text size="xs" c="base.3">
          *на момент закрытия ставок
        </Text>
      </Title>
      <Space h="md" />
      <div className={styles.pool}>
        {["T8", "SF6"].map((g, ind) => (
          <Pool key={ind} game={g} amount={mockPool?.[g] ?? 0} size={3} />
        ))}
      </div>
      <Space h="lg" />
      <Title order={3} style={{ textAlign: "center" }}>
        Ожидается внесение результатов
      </Title>
      <Space h="lg" />
    </Box>
    <Text size="sm">
      2. Подведения итогов лотереи на сайте. Вычисление победителей ставок
      завязано на окончание самого турнира. Как только официальный расклад сил в
      топ-8 ясен, мы запускаем поиск успешных ставок среди всех заявленных.
      Результаты будут на странице Ивента
    </Text>
  </>
);

export const slide4 = <SlideWrap>{contSlide4}</SlideWrap>;
