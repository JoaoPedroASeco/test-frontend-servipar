import { styled } from "@/styles";

export const ProductsTableListContainer = styled("main", {
  display: "flex",
  width: "100%",
  height: "80%",

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
  },
});
