import { useSpring, animated } from "@react-spring/web";
import { Title, Stack, Image } from "@mantine/core";
import { logoByGame } from "./const";

export const Pool = ({ amount, game, size = 1 }) => {
  const { number } = useSpring({
    number: amount,
    from: { number: 0 },
  });

  return (
    <Stack style={{ flex: "0 1 200px" }} justify="end">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Image
          src={logoByGame[game]}
          fallbackSrc="https://placehold.co/440x120?text=Game_logo"
        />
      </div>

      <Title order={size as any} c="base.5" ta="center">
        <animated.span>
          {number.to((n) => Number(n.toFixed(0)).toLocaleString("en-US"))}
        </animated.span>
        <span> ₽</span>
      </Title>
    </Stack>
  );
};
