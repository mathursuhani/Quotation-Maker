import React from "react";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PDFGenerator = ({ formData, items, total }) => {
  const generatePDF = () => {
  const doc = new jsPDF();
  const margin = 14;

  let logoWidth = 0;
  let logoHeight = 0;

  // ✅ Step 1: Draw logo at top-left
  if (formData.logo) {
    const imgProps = doc.getImageProperties(formData.logo);
    const aspectRatio = imgProps.width / imgProps.height;
    const maxWidth = 40;
    const maxHeight = 40;

    logoWidth = maxWidth;
    logoHeight = logoWidth / aspectRatio;

    if (logoHeight > maxHeight) {
      logoHeight = maxHeight;
      logoWidth = logoHeight * aspectRatio;
    }

    doc.addImage(formData.logo, "PNG", margin, 20, logoWidth, logoHeight);
  }

  // ✅ Step 2: Quotation info (top-right)
  const rightX = 200;
  const topY = 40;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Quotation No: ${formData.quotationNumber}`, rightX, topY, { align: "right" });
  doc.text(`Date: ${formData.date}`, rightX, topY + 6, { align: "right" });
  doc.text(`Due Date: ${formData.dueDate}`, rightX, topY + 12, { align: "right" });

  // ✅ Step 3: Company info BELOW logo (add gap after logo)
  let companyStartY = 20 + logoHeight + 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(formData.companyName || "Company Name", margin, companyStartY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  companyStartY += 6;
  doc.text(formData.address || "", margin, companyStartY);
  companyStartY += 5;
  doc.text(formData.city || "", margin, companyStartY);
  companyStartY += 5;
  doc.text(`Email: ${formData.email || ""}`, margin, companyStartY);

  // ✅ Step 4: QUOTATION Title centered
  const headingY = Math.max(companyStartY, topY + 20) + 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("QUOTATION", 105, headingY, { align: "center" });

  let y = headingY + 10;

  // ✅ Quotation To & Shipping To Boxes
  const boxHeight = 25;
  doc.setDrawColor(200);
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, y, 85, boxHeight, "FD");
  doc.rect(margin + 95, y, 85, boxHeight, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(124, 58, 237);
  doc.text("Quotation to:", margin + 2, y + 5);
  doc.setTextColor(2, 132, 199);
  doc.text("Shipping to:", margin + 97, y + 5);

  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const qLines = [
    formData.toCompany,
    formData.toAddress,
    formData.toCity,
    `Country: ${formData.toCountry}`,
  ];
  const sLines = [
    formData.shipCompany,
    formData.shipAddress,
    formData.shipCity,
    `Country: ${formData.shipCountry}`,
  ];
  qLines.forEach((line, i) => doc.text(line || "-", margin + 2, y + 10 + i * 4));
  sLines.forEach((line, i) => doc.text(line || "-", margin + 97, y + 10 + i * 4));

  y += boxHeight + 10;

  // ✅ Client Info Box
  doc.setDrawColor(210);
  doc.setLineWidth(0.2);
  doc.rect(margin, y, 180, 20);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Client Name: ${formData.clientName || "-"}`, margin + 2, y + 6);
  doc.text(`Email: ${formData.clientEmail || "-"}`, margin + 2, y + 11);
  doc.text(`Phone: ${formData.clientPhone || "-"}`, margin + 2, y + 16);

  y += 30;

  // ✅ Item Table
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

  autoTable(doc, {
    startY: y,
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

  // ✅ Notes & Terms
  doc.setDrawColor(230);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Notes:", margin, finalY);
  doc.text(doc.splitTextToSize(formData.notes || "-", 180), margin + 10, finalY + 5);

  doc.text("Terms:", margin, finalY + 15);
  doc.text(doc.splitTextToSize(formData.terms || "-", 180), margin + 10, finalY + 20);

  // ✅ Total
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0);
  doc.text(`Total: ₹${total.toFixed(2)}`, margin, finalY + 35);

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







