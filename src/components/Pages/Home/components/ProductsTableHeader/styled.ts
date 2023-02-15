import { styled } from "@/styles";

export const ProductsTableHeaderContainer = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  width: "100%",

  ".title-search": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2rem",

    h1: {
      span: {
        color: "$green100",
      },
    },

    form: {
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
    },
  },

  ".report-logout": {
    display: "flex",
    gap: "1rem",
  },
});
