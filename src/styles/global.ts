import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
  },

  body: {
    backgroundColor: "$gray900",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },

  "body, input, textarea, button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },

  button: {
    cursor: "pointer",
  },

  ".react-modal-overlay": {
    background: "rgba(0, 0, 0, 0.5)",

    position: "fixed",

    top: "0",
    left: "0",
    right: "0",
    bottom: "0",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  ".react-modal-content": {
    width: "100%",
    maxWidth: "450px",
    maxHeight: "80%",
    minHeight: "550px",
    backgroundColor: "$gray600",
    padding: "1.75rem",
    position: "relative",
    borderRadius: ".5rem",
  },

  ".react-modal-close": {
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
    border: "1px solid $red100",
    backgroundColor: "transparent",
    height: "35px",
    width: "35px",
    borderRadius: ".5rem",

    transform: "filter .2s",

    "&:hover": {
      filter: "brightness(.8)",
    },
  },

  "::-webkit-scrollbar": {
    width: "8px !important",
    background: "$gray800",
    borderRadius: ".5rem",
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: ".5rem",
    background: "$green100",
  },

  "::-webkit-scrollbar-track": {},
});
