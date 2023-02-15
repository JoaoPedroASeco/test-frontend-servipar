import { styled } from "@/styles";

export const LoginFormularyContainer = styled("form", {
  display: "flex",
  width: "100%",
  flexDirection: "column",

  ".theme-input": {
    marginBottom: "1rem",
  },

  button: {
    marginTop: "2rem",
  },
});
