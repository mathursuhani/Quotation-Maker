import React, { useEffect } from "react";
import {
  TextField,
  Grid,
  Typography,
  Box,
} from "@mui/material";

const QuotationForm = ({ formData, setFormData, handleLogoUpload }) => {
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");
    const randomId = `#Q-${Math.floor(100 + Math.random() * 900)}`;
    setFormData((prev) => ({
      ...prev,
      date: today,
      quotationNumber: randomId,
    }));
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Header Section */}
      <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
        {/* Logo Upload */}
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 2,
              textAlign: "center",
              p: 2,
            }}
          >
            {formData.logo ? (
              <img
                src={formData.logo}
                alt="Company Logo"
                style={{ maxWidth: "100%", maxHeight: 100 }}
              />
            ) : (
              <Typography sx={{ fontSize: 14, color: "#666" }}>
                Upload Logo
              </Typography>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ marginTop: 8 }}
            />
          </Box>
        </Grid>

        {/* Company Info */}
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            name="companyName"
            label="Your Company Name"
            value={formData.companyName}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            name="city"
            label="City, State ZIP"
            value={formData.city}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            size="small"
          />
        </Grid>

        {/* Quotation Info */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            QUOTATION
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Quotation No:</strong> {formData.quotationNumber}
          </Typography>
          <Typography variant="body2">
            <strong>Date:</strong> {formData.date}
          </Typography>
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            size="small"
            value={formData.dueDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 1 }}
          />
        </Grid>
      </Grid>

      {/* Quotation To & Shipping To */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontWeight: 600, color: "#7c3aed" }}>
            Quotation to:
          </Typography>
          <TextField
            name="toCompany"
            label="Company"
            fullWidth
            size="small"
            value={formData.toCompany}
            onChange={handleChange}
          />
          <TextField
            name="toAddress"
            label="Address"
            fullWidth
            size="small"
            value={formData.toAddress}
            onChange={handleChange}
            sx={{ mt: 1 }}
          />
          <TextField
            name="toCity"
            label="City"
            fullWidth
            size="small"
            value={formData.toCity}
            onChange={handleChange}
            sx={{ mt: 1 }}
          />
          <TextField
            name="toCountry"
            label="Country"
            fullWidth
            size="small"
            value={formData.toCountry}
            onChange={handleChange}
            sx={{ mt: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontWeight: 600, color: "#0284c7" }}>
            Shipping to:
          </Typography>
          <TextField
            name="shipCompany"
            label="Company"
            fullWidth
            size="small"
            value={formData.shipCompany}
            onChange={handleChange}
          />
          <TextField
            name="shipAddress"
            label="Address"
            fullWidth
            size="small"
            value={formData.shipAddress}
            onChange={handleChange}
            sx={{ mt: 1 }}
          />
          <TextField
            name="shipCity"
            label="City"
            fullWidth
            size="small"
            value={formData.shipCity}
            onChange={handleChange}
            sx={{ mt: 1 }}
          />
          <TextField
            name="shipCountry"
            label="Country"
            fullWidth
            size="small"
            value={formData.shipCountry}
            onChange={handleChange}
            sx={{ mt: 1 }}
          />
        </Grid>
      </Grid>

      {/* Client Info */}
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





