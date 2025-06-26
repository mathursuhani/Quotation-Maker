import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography, Box } from "@mui/material";

const SummaryBox = ({ items, setTotal: setParentTotal }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0); // in percent
  const [discount, setDiscount] = useState(0); // in percent
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sub = items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      return sum + qty * rate;
    }, 0);
    setSubtotal(sub);

    const taxAmt = (sub * tax) / 100;
    const discountAmt = (sub * discount) / 100;
    const finalTotal = sub + taxAmt - discountAmt;
    setTotal(finalTotal);
    setParentTotal(finalTotal); // pass back to parent
  }, [items, tax, discount, setParentTotal]);

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Subtotal (₹)"
            value={subtotal.toFixed(2)}
            fullWidth
            disabled
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Tax (%)"
            value={tax}
            onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
            fullWidth
            type="number"
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Discount (%)"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
            fullWidth
            type="number"
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Total (₹)"
            value={total.toFixed(2)}
            fullWidth
            disabled
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: 1,
              fontWeight: "bold",
            }}
          />
        </Grid>

        
      </Grid>
    </Box>
  );
};

export default SummaryBox;



