import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const ItemTable = ({ items, setItems }) => {
  const handleAddRow = () => {
    setItems([
      ...items,
      { itemName: "", quantity: "", rate: "", amount: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    if (field === "quantity" || field === "rate") {
      const qty = parseFloat(updated[index].quantity) || 0;
      const rate = parseFloat(updated[index].rate) || 0;
      updated[index].amount = (qty * rate).toFixed(2);
    }
    setItems(updated);
  };

  return (
    <Box sx={{ mt: 3 }}>
      

      <TableContainer component={Paper} sx={{ borderRadius: 2, maxHeight: 400 }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Item Name</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Rate (₹)</strong></TableCell>
              <TableCell><strong>Amount (₹)</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    placeholder="Item Name"
                    value={item.itemName}
                    onChange={(e) =>
                      handleChange(index, "itemName", e.target.value)
                    }
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white", borderRadius: 1 }}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    fullWidth
                    size="small"
                    type="number"
                    sx={{ backgroundColor: "white", borderRadius: 1 }}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) =>
                      handleChange(index, "rate", e.target.value)
                    }
                    fullWidth
                    size="small"
                    type="number"
                    sx={{ backgroundColor: "white", borderRadius: 1 }}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    placeholder="Amount"
                    value={item.amount}
                    disabled
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "#f4f4f4", borderRadius: 1 }}
                  />
                </TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveRow(index)}
                    color="error"
                  >
                    <RemoveCircle />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          startIcon={<AddCircle />}
          onClick={handleAddRow}
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 2 }}
        >
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default ItemTable;





