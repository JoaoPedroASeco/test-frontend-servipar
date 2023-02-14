import { styled } from "@/styles";

export const LoginFormularyContainer = styled("form", {
  display: "flex",
  width: "100%",
  flexDirection: "column",

  ".theme-input": {
    marginBottom: "1rem",
  },

  button: {
    marginTop: "2rem",
  },

  ".user-register-question": {
    marginTop: "1.5rem",
    cursor: "pointer",
    transition: "all .4s ease-in-out",

    strong: {
      color: "$green100",
    },

    "&:hover": {
      filter: "brightness(1.2)",
    },
  },
});
