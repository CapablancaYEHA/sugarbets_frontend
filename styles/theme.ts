import { createTheme, MantineColorsTuple } from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#ffeaf4",
  "#fcd4e3",
  "#f4a6c5",
  "#ed76a5",
  "#e74e8a",
  "#e91e63",
  "#e32670",
  "#c2185b",
  "#b51054",
  "#9f0048",
];

export const theme = createTheme({
  colors: { base: myColor },
  primaryColor: "base",
});
