import { styled } from "@/styles";

export const ProductsReportListContainer = styled("div", {
  display: "flex",
  width: "100%",
  height: "85%",

  table: {
    "thead, tbody": {
      tr: {
        th: {
          "&.id": {
            display: "flex",
            flex: "1",
          },
          "&.name": {
            display: "flex",
            flex: "2",
          },
          "&.cost": {
            display: "flex",
            flex: "2",
          },
          "&.quantity": {
            display: "flex",
            flex: "2",
          },
          "&.locationId": {
            display: "flex",
            flex: "2",
          },
          "&.familyId": {
            display: "flex",
            flex: "2",
          },
        },
      },
    },

    tbody: {
      flexDirection: "column",
      overflow: "unset",
      maxHeight: "unset",
    },
  },
});
