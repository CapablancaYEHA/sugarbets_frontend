import { List, Title, Space, Box } from "@mantine/core";

export const Terms = () => {
  return (
    <Box
      component="section"
      style={{
        display: "block",
        margin: "0 auto",
        padding: "32px 0",
      }}
    >
      <List type="ordered">
        <Title order={2} style={{ textAlign: "center" }}>
          Соглашение пользователя
        </Title>
        <Space h="lg" />
        <List.Item>
          Регистрируясь на сайте и совершая действия на его страницах, я
          подтверждаю что согласен со всеми условиями данного соглашения.
        </List.Item>
        <List.Item>
          Сайт не является игровой платформой, букмекером, не предлагает и не
          осуществляет подобного рода услуги.
        </List.Item>
        <List.Item>
          Контент сайта (билеты, ставки и т.д) не является товаром или услугой,
          предоставляется пользователю абсолютно безвозмездно. Все денежные
          переводы, осуществляемые пользователем, являются
          донатом/подарком/добровольным отчислением в адрес получателя.
        </List.Item>
      </List>
    </Box>
  );
};