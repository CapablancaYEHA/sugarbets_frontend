import { Title, Space, Box, Text, Button } from "@mantine/core";
import { Discord } from "../components/icons/discord";

export const Info = () => {
  return (
    <Box
      component="section"
      py="lg"
      style={{
        display: "block",
        margin: "0 auto",
      }}
    >
      <Title order={2}>Информация для связи</Title>
      <Space h="lg" />
      <Text size="lg">
        Мы в Discord <Discord />
      </Text>
      <Text size="md">
        <span style={{ userSelect: "all", fontWeight: 500 }}>ruf1nad</span> —
        мечтатель, филантроп 🥱
      </Text>
      <Text size="md">
        <span style={{ userSelect: "all", fontWeight: 500 }}>capablanca</span> —
        архитектор, full-stack кодер, devops 😎
      </Text>
      <Space h="xs" />
      <Button
        component="a"
        href="https://discord.gg/KYdW4Gc"
        variant="outline"
        fullWidth={false}
        style={{ width: "min-content" }}
      >
        Наш сервер
      </Button>
      <Space h="xl" />
      <Text size="md">
        Готовы выслушать критику по функционалу и дизайну сайта. Интересно
        узнать идеи и предложения по дальнейшему развитию. Готовы пообщаться по
        поводу интеграций
      </Text>
    </Box>
  );
};
