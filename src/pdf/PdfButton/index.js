import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "../PdfDocument";


export default function PdfButton(props) {

  return (
    <div className="container">
      <PDFDownloadLink
        document={<PdfDocument {...props} />}
        fileName="typeresult.pdf"
        style={{
          textDecoration: "none",
          padding: "10px",
          color: "#4a4a4a",
          backgroundColor: "#f2f2f2",
          border: "1px solid #4a4a4a"
        }}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Pdf"
        }
      </PDFDownloadLink>
    </div>
  );
}