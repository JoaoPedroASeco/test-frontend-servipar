import { styled } from "@/styles";

export const ProductsTableFooterContainer = styled("footer", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "auto 0 0 0 ",

  ".pagination": {
    display: "flex",
    alignItems: "center",
    gap: "2rem",

    ".limit, .page": {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },

    ul: {
      display: "flex",
      gap: "1rem",

      button: {
        height: "37px",
        backgroundColor: "$gray300",
        border: "none",
        padding: "0 2rem",
        borderRadius: ".5rem",
        color: "$gray900",
        fontWeight: "bold",

        "&.active": {
          backgroundColor: "$green100",
          color: "$white",
        },
      },
    },
  },
});
