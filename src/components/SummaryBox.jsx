import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Box } from '@mui/material';

const SummaryBox = ({ items }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0); // in percent
  const [discount, setDiscount] = useState(0); // in percent
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate subtotal from item data
    const sub = items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      return sum + qty * rate;
    }, 0);
    setSubtotal(sub);

    // Total = subtotal + tax - discount
    const taxAmt = (sub * tax) / 100;
    const discountAmt = (sub * discount) / 100;
    setTotal(sub + taxAmt - discountAmt);
  }, [items, tax, discount]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Subtotal (₹)"
            value={subtotal.toFixed(2)}
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Tax (%)"
            value={tax}
            onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Discount (%)"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Total (₹)"
            value={total.toFixed(2)}
            fullWidth
            disabled
            sx={{ fontWeight: 'bold' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryBox;
