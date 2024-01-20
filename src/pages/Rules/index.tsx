import { Title, Box, Space } from "@mantine/core";

import {
  contSlide1,
  contSlide2,
  contSlide3,
  contSlide4,
} from "../../components/intro/const";
import styles from "./styles.module.scss";

export const Rules = () => {
  return (
    <Box className={styles.wrapper} component="section" py="lg">
      <Title order={2} style={{ textAlign: "center" }}>
        Правила, краткое руководство
      </Title>
      <Space h="lg" />
      <Title order={3} style={{ textAlign: "center" }}>
        Первый шаг
      </Title>
      <Space h="sm" />
      {contSlide1}
      <Space h="xl" />
      <Title order={3} style={{ textAlign: "center" }}>
        Выбрать Ивент
      </Title>
      <Space h="sm" />
      {contSlide2}
      <Space h="xl" />
      <Title order={3} style={{ textAlign: "center" }}>
        Сделать ставку
      </Title>
      <Space h="sm" />
      {contSlide3}
      <Space h="xl" />
      <Title order={3} style={{ textAlign: "center" }}>
        Ожидать результатов
      </Title>
      <Space h="sm" />
      {contSlide4}
      <Space h="xl" />
    </Box>
  );
};
