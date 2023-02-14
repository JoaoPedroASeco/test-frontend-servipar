import { CSSProperties } from "@stitches/react";
import { ReactNode } from "react";

//Styles
import { ThemeButtonContainer } from "./styles";

type ThemeButtonType = {
  children?: number | string | ReactNode | any;
  type?: "button" | "reset" | "submit";
  onclick?: (_?: any) => void;
  style?: CSSProperties;
};

export const ThemeButton = ({
  children,
  type = "button",
  style,
  onclick,
}: ThemeButtonType) => {
  return (
    <ThemeButtonContainer type={type} style={style} onClick={onclick}>
      {children}
    </ThemeButtonContainer>
  );
};
