import { styled } from "@/styles";

export const LoginHeaderContainer = styled("header", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "2rem",

  strong: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "$green100",
  },

  span: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
    letterSpacing: "2.5px",
  },
});
