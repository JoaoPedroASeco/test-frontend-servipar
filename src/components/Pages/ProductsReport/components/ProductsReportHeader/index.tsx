import { useContext } from "react";

//Components
import { ThemeButton } from "@/components/General/Button";

//Styles
import { ProductsReportHeaderContainer } from "./styles";

//Contexts
import { GeneralContext } from "@/contexts/GeneralContext";

//Libs
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ProductsReportList } from "../ProductsReportList";

export const ProductsReportHeader = () => {
  const { router } = useContext(GeneralContext);
  const { ElementRef } = useContext(GeneralContext);

  function generatePDF(component: any) {
    if (ElementRef.current) {
      html2canvas(ElementRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        const pdfData = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfData);
        window.open(pdfUrl, "_blank");
      });
    }
  }

  return (
    <ProductsReportHeaderContainer>
      <div className="title-search">
        <h1>
          <span>Relatório</span> de Produtos:
        </h1>
      </div>

      <div className="report-logout">
        <ThemeButton
          onclick={() => generatePDF(<ProductsReportList />)}
          type="button"
          style={{
            padding: "0 2rem",
          }}
        >
          Exportar para PDF
        </ThemeButton>
        <ThemeButton
          onclick={() => router.push("/home")}
          type="button"
          style={{
            padding: "0 2rem",
            backgroundColor: "#FD5E5E",
          }}
        >
          Voltar
        </ThemeButton>
      </div>
    </ProductsReportHeaderContainer>
  );
};
