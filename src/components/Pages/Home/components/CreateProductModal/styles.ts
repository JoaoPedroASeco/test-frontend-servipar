import Modal from "react-modal";
import { styled } from "@/styles";

export const CustomModal = styled(Modal, {
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",

    h2: {
      fontSize: "2rem",

      span: {
        color: "$green100",
      },
    },

    ".theme-input": {
      width: "100%",
    },

    ".footer": {
      marginTop: "2.5rem",
      display: "flex",
      gap: "1rem",
    },
  },
});
