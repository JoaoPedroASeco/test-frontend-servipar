import { createStitches } from "@stitches/react";

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: "#ffff",

      gray900: "#121214",
      gray800: "#282824",
      gray700: "#373732",
      gray600: "#474742",
      gray500: "#60605A",
      gray400: "#93938E",
      gray300: "#c4c4cc",
      gray100: "#e1e1e6",

      green500: "#00875f",
      green300: "#00b37e",
      green100: "#00E5A1",

      red100: "#FD5E5E"
    },

    fontSizes: {
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem",
    },
  },
});
