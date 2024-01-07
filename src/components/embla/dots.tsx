import { FC } from "preact/compat";
import "./embla.scss";

export const DotButton: FC<any> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
