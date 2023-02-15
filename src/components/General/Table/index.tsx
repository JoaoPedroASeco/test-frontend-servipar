import { ReactNode } from "react";

//Styles
import { ThemeTableContainer } from "./styles";

export const ThemeTable = ({
  theadChildren,
  tbodyChildren,
  tbodyId,
  theadId,
  tableId,
}: {
  theadChildren: ReactNode;
  tbodyChildren: ReactNode;
  tableId?: string;
  tbodyId?: string;
  theadId?: string;
}) => {
  return (
    <ThemeTableContainer id={tableId}>
      <thead id={theadId}>
        <tr>{theadChildren}</tr>
      </thead>
      <tbody id={tbodyId}>{tbodyChildren}</tbody>
    </ThemeTableContainer>
  );
};
