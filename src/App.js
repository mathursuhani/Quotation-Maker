import React, { useState, useEffect } from 'react';
import {
  Container,
  CssBaseline,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import QuotationForm from './components/QuotationForm';
import ItemTable from './components/ItemTable';
import SummaryBox from './components/SummaryBox';
import PDFGenerator from './components/PdfGenerator';

const Section = ({ title, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    {children}
  </Box>
);

function App() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    date: '',
    quotationNumber: '',
    notes: '',
    terms: '',
  });

  const [items, setItems] = useState([
    { itemName: '', quantity: '', rate: '', amount: '' },
  ]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');
    const randomId = `#Q-${Math.floor(100 + Math.random() * 900)}`;
    setFormData((prev) => ({
      ...prev,
      date: today,
      quotationNumber: randomId,
    }));
  }, []);

  const handleSubmit = () => {
    console.log('Submitted Quotation:', { formData, items, total });
    alert('Quotation Submitted to Console');
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Quotation Maker
          </Typography>

          {/* Client Info */}
          <QuotationForm formData={formData} setFormData={setFormData} />

          {/* Item Table */}
          <Section title="Quotation Items">
            <ItemTable items={items} setItems={setItems} />
          </Section>

          {/* Summary Box */}
          <Section title="Summary">
            <SummaryBox items={items} setTotal={setTotal} />
          </Section>

          {/* PDF + Submit */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <PDFGenerator formData={formData} items={items} total={total} />
            
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default App;

