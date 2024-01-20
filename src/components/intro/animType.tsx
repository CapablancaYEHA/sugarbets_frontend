import { TypeAnimation } from "react-type-animation";

export const AnimType = ({ text, callback }) => (
  <TypeAnimation
    sequence={[text, 200, callback]}
    speed={{ type: "keyStrokeDelayInMs", value: 50 }}
    omitDeletionAnimation={true}
    style={{
      fontSize: "1em",
      display: "block",
      whiteSpace: "pre-line",
    }}
    cursor={false}
  />
);
