import { styled } from "@/styles";

export const ProductsReportContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  margin: "4rem 0",
});

export const ProductsReportComponent = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "90vw",
  height: "100%",
  backgroundColor: "$gray600",
  borderRadius: "1rem",
  padding: "2rem",

  header: {
    marginBottom: "2.5rem",
  },
});
