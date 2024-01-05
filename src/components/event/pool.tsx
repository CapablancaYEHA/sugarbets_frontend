import { useSpring, animated } from "react-spring";
import { Title, Stack, Image } from "@mantine/core";
import { logoByGame } from "./const";

export const Pool = ({ amount, game }) => {
  const { number } = useSpring({
    number: amount,
    from: { number: 0 },
  });

  return (
    <Stack style={{ flex: "0 1 200px" }}>
      <Image
        src={logoByGame[game]}
        fallbackSrc="https://placehold.co/440x120?text=Game_logo"
      />
      <Title order={1} c="base.5" ta="center">
        <animated.span>
          {number.to((n) => Number(n.toFixed(0)).toLocaleString("en-US"))}
        </animated.span>
        <span> ₽</span>
      </Title>
    </Stack>
  );
};
