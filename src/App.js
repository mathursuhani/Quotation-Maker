import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Paper,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  Divider,
} from "@mui/material";
import QuotationForm from "./components/QuotationForm";
import ItemTable from "./components/ItemTable";
import SummaryBox from "./components/SummaryBox";
import PDFGenerator from "./components/PdfGenerator";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#f3f4f6" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

const Section = ({ title, children }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{ fontWeight: 600, color: "#333", mb: 2 }}
    >
      {title}
    </Typography>
    {children}
  </Paper>
);

function App() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    date: "",
    quotationNumber: "",
    notes: "",
    terms: "",
  });

  const [items, setItems] = useState([
    { itemName: "", quantity: "", rate: "", amount: "" },
  ]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");
    const randomId = `#Q-${Math.floor(100 + Math.random() * 900)}`;
    setFormData((prev) => ({
      ...prev,
      date: today,
      quotationNumber: randomId,
    }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{ p: 4, borderRadius: 4, bgcolor: "#ffffff" }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: "#111827" }}>
              Quotation Maker
            </Typography>
            <Typography sx={{ color: "#6b7280" }}>
              Generate beautiful, exportable quotations
            </Typography>
          </Box>

          <Section title="Client Information">
            <QuotationForm formData={formData} setFormData={setFormData} />
          </Section>

          <Section title="Quotation Items">
            <ItemTable items={items} setItems={setItems} />
          </Section>

          <Section title="Summary">
            <SummaryBox items={items} setTotal={setTotal} />
          </Section>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <PDFGenerator formData={formData} items={items} total={total} />
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;

