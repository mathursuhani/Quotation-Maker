import React from "react";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PDFGenerator = ({ formData, items, total }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Centered Quotation Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("Quotation", 105, 20, { align: "center" });

    // Draw Client Info Box
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);
    doc.setDrawColor(200);
    doc.rect(14, 28, 180, 30);

    const infoY = 34;
    const clientDetails = [
      `Client Name: ${formData.clientName || ""}`,
      `Email: ${formData.clientEmail || ""}`,
      `Phone: ${formData.clientPhone || ""}`,
      `Date: ${formData.date || ""}`,
      `Quotation No: ${formData.quotationNumber || ""}`,
    ];

    clientDetails.forEach((line, idx) => {
      doc.text(line, 18, infoY + idx * 5);
    });

    // Table data with calculated amount
    const tableBody = items.map((item) => {
      const qty = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      const amount = qty * rate;
      return [
        item.itemName || "-",
        qty.toString(),
        rate.toFixed(2),
        amount.toFixed(2),
      ];
    });

    // Table
    autoTable(doc, {
      startY: 65,
      head: [["Item Name", "Quantity", "Rate (₹)", "Amount (₹)"]],
      body: tableBody,
      styles: {
        fontSize: 10,
        halign: "center",
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [30, 136, 229],
        textColor: 255,
        fontStyle: "bold",
      },
      theme: "grid",
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    // Notes and Terms
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(80);
    doc.text(`Notes: ${formData.notes || "N/A"}`, 14, finalY);
    doc.text(`Terms: ${formData.terms || "N/A"}`, 14, finalY + 7);

    // Total Amount
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Total: ₹${total.toFixed(2)}`, 14, finalY + 20);

    // Footer - Signature and Prepared By
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    

    doc.save("quotation.pdf");
  };

  return (
    <Button
      variant="contained"
      onClick={generatePDF}
      sx={{
        background: "linear-gradient(to right, #22c55e, #16a34a)",
        color: "white",
        fontWeight: 600,
        borderRadius: 3,
        px: 4,
        py: 1.5,
        '&:hover': {
          background: "linear-gradient(to right, #16a34a, #15803d)",
        },
      }}
    >
      Download PDF
    </Button>
  );
};

export default PDFGenerator;





