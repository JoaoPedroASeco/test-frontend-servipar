import { styled } from "@/styles";

export const ThemeinputContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  label: {
    fontSize: "0.875rem",
    fontWeight: "bold",
    color: "$gray300",
    lineHeight: "0.875rem",
    margin: "0.75rem",
    cursor: "pointer",
  },

  input: {
    display: "flex",
    fontSize: "0.875rem",
    fontWeight: "bold",
    background: "$gray300",
    border: "none",
    borderRadius: ".5rem",
    height: "2.313rem",
    colort: "$gray900",
    paddingLeft: "1rem",
    outline: "none",
    borderBox: "none",

    "&::placeholder": {
      color: "$gray600",
    },
  },

  select: {
    display: "flex",
    fontSize: "0.875rem",
    fontWeight: "bold",
    background: "$gray300",
    border: "none",
    borderRadius: ".5rem",
    height: "2.313rem",
    colort: "$gray900",
    paddingLeft: "1rem",
    outline: "none",
    borderBox: "none",

    "&::placeholder": {
      color: "$gray600",
    },
  },

  ".input-error": {
    margin: "0.5rem 0 0 0.75rem",
    color: "$red100",
  },
});
