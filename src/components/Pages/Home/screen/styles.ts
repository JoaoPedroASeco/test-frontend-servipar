import { styled } from "@/styles";

export const HomeContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

export const HomeComponent = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "90vw",
  height: "80vh",
  backgroundColor: "$gray600",
  borderRadius: "1rem",
  padding: "2rem",
});
