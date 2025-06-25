import React from 'react';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PDFGenerator = ({ formData, items, total }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Quotation', 14, 20);

    doc.setFontSize(12);
    doc.text(`Client Name: ${formData.clientName}`, 14, 30);
    doc.text(`Email: ${formData.clientEmail}`, 14, 36);
    doc.text(`Phone: ${formData.clientPhone}`, 14, 42);
    doc.text(`Date: ${formData.date}`, 14, 48);
    doc.text(`Quotation No: ${formData.quotationNumber}`, 14, 54);

    autoTable(doc, {
      startY: 65,
      head: [['Item Name', 'Quantity', 'Rate', 'Amount']],
      body: items.map((item) => [
        item.itemName,
        item.quantity,
        item.rate,
        item.amount,
      ]),
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    doc.text(`Notes: ${formData.notes}`, 14, finalY);
    doc.text(`Terms: ${formData.terms}`, 14, finalY + 8);

    doc.setFontSize(14);
    doc.text(`Total: ₹${total.toFixed(2)}`, 14, finalY + 20);

    doc.save('quotation.pdf');
  };

  return (
    <Button variant="outlined" onClick={generatePDF}>
      Download PDF
    </Button>
  );
};

export default PDFGenerator;

