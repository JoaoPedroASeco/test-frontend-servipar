import { styled } from "@/styles";

export const ThemeButtonContainer = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "3rem",
  textTransform: "uppercase",
  color: "white",
  backgroundColor: "$green300",
  border: "none",
  borderRadius: ".5rem",
  fontWeight: "bold",
  letterSpacing: "0.156rem",

  transition: "all .4s ease-in-out",

  "&:hover": {
    filter: "brightness(1.1)",
  },
});
