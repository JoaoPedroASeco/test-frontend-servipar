import { styled } from "@/styles";

export const ProductsReportFooterContainer = styled("div", {
  display: "flex",
  width: "100%",
  marginTop: "2rem",
  justifyContent: "start",
  gap: "2rem",

  ".quantity ,.price": {
    fontSize: "1.25rem",

    span: {
      color: "$green100",
      fontWeight: "bold",
    },
  },
});
