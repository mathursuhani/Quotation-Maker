import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Typography,
  Box,
} from "@mui/material";

const QuotationForm = ({ formData, setFormData }) => {
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");
    const randomId = `#Q-${Math.floor(100 + Math.random() * 900)}`;
    setFormData((prev) => ({
      ...prev,
      date: today,
      quotationNumber: randomId,
      preparedBy: "Your Company Name",
    }));
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            name="clientName"
            label="Client Name"
            value={formData.clientName}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            name="clientEmail"
            label="Client Email"
            type="email"
            value={formData.clientEmail}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            name="clientPhone"
            label="Client Phone"
            type="tel"
            value={formData.clientPhone}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="date"
            label="Date"
            value={formData.date}
            disabled
            fullWidth
            size="small"
            sx={{ backgroundColor: "#f1f1f1", borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="quotationNumber"
            label="Quotation No"
            value={formData.quotationNumber}
            disabled
            fullWidth
            size="small"
            sx={{ backgroundColor: "#f1f1f1", borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="notes"
            label="Notes"
            value={formData.notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            size="small"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="terms"
            label="Terms & Conditions"
            value={formData.terms}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            size="small"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Grid>

        
      </Grid>
    </Box>
  );
};

export default QuotationForm;




