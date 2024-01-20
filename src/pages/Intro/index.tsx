import { useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import { Box, Button, Space, Text, Stack } from "@mantine/core";
import { useSpring, animated } from "@react-spring/web";

import { IntroUser } from "../../components/intro/user";
import {
  arsSpeech,
  kingSpeech,
  slide1,
  slide2,
  slide3,
  slide4,
} from "../../components/intro/const";
import { Carousel } from "../../components/embla/carousel";
import styles from "./styles.module.scss";
import { AnimType } from "../../components/intro/animType";

const contentArr = [slide1, slide2, slide3, slide4];

export const Intro = () => {
  const location = useLocation();
  const [step, setStep] = useState(0);

  const first = useSpring({
    from: { display: "none", opacity: 0 },
    to: { display: "block", opacity: 1 },
    delay: 500,
    config: { mass: 5, tension: 1300, friction: 200 },
    onRest: () => setStep(1),
  });

  const second = useSpring({
    display: step >= 2 ? "block" : "none",
    opacity: step >= 2 ? 1 : 0,
    config: { mass: 5, tension: 1300, friction: 200 },
    onRest: () => setStep(3),
  });

  const slider = useSpring({
    display: step >= 4 ? "block" : "none",
    opacity: step >= 4 ? 1 : 0,
    config: { mass: 5, tension: 1300, friction: 200 },
  });

  return (
    <Box component="section" py="lg" className={styles.wrap}>
      <section>
        <animated.div style={first} class={styles.rel}>
          <IntroUser user="Arslan Ash">
            {step >= 1 ? (
              <AnimType
                text={arsSpeech}
                callback={() => {
                  setTimeout(() => setStep(2), 1000);
                }}
              />
            ) : null}
          </IntroUser>
        </animated.div>
        <animated.div style={second} class={styles.rel}>
          <IntroUser user="KINGusha" c="green">
            {step >= 3 ? (
              <AnimType text={kingSpeech} callback={() => setStep(4)} />
            ) : null}
          </IntroUser>
        </animated.div>
        <animated.div style={slider}>
          <Carousel content={contentArr} />
        </animated.div>
      </section>

      <Stack mt="auto" align="center">
        <Space value="md" />
        <Text size="xs" pt="xs" mt="auto">
          Пропустить краткое введение и просто
        </Text>
        <Button
          fullWidth={false}
          style={{ width: "min-content" }}
          onClick={() => location.route("/login")}
        >
          Перейти на логин
        </Button>
      </Stack>
    </Box>
  );
};
