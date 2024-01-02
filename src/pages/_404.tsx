import { Box, Stack, Text, Button, Title, Space } from "@mantine/core";

export const NotFound = () => {
  return (
    <Box
      component="section"
      py="lg"
      style={{
        display: "block",
        margin: "0 auto",
      }}
    >
      <Title c="base.7" style={{ fontSize: "96px" }} ta="center">
        404
      </Title>
      <Space h="lg" />
      <Stack>
        <Text size="md">
          Ох! Вы оказались на несуществующей странице. <br />
          Предлагаем перейти в более актуальный раздел
        </Text>
        <Space h="xs" />
        <Button
          component="a"
          href="/"
          variant="outline"
          fullWidth={false}
          style={{ width: "min-content" }}
        >
          На главную
        </Button>
      </Stack>
    </Box>
  );
};
