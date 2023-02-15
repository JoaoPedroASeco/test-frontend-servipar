import { styled } from "@/styles";

export const ThemeTableContainer = styled("table", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",

  "thead, tbody": {
    display: "flex",
    width: "100%",

    tr: {
      display: "flex",
      width: "100%",
    },
  },

  thead: {
    marginBottom: "1rem",
    tr: {
      gap: ".25rem",
      th: {
        display: "flex",

        button: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "37px",
          textAlign: "start",
          padding: "0 1rem",
          backgroundColor: "$gray400",
          border: "none",
          fontWeight: "bold",
          color: "$white",
          fontSize: "1rem",
          borderRadius: ".5rem",
        },
      },
    },
  },

  tbody: {
    flexDirection: "column",
    overflow: "auto",
    maxHeight: "100%",
    gap: ".5rem",

    tr: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      borderRadius: ".5rem",
      backgroundColor: "$gray100",
      minHeight: "37px",
      gap: ".25rem",

      th: {
        display: "flex",
        alignItems: "center",
        color: "$gray700",
        paddingLeft: "1rem",
      },
    },
  },
});
