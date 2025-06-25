import React from 'react';
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
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const ItemTable = ({ items, setItems }) => {
  const handleAddRow = () => {
    setItems([...items, { itemName: '', quantity: '', rate: '', amount: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  return (
    <Box sx={{ mt: 2 }}>
      

      <Table sx={{ minWidth: 650 }}>
        <TableHead>
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
                  onChange={(e) => handleChange(index, 'itemName', e.target.value)}
                  fullWidth
                  size="small"
                />
              </TableCell>

              <TableCell>
                <TextField
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                  fullWidth
                  size="small"
                />
              </TableCell>

              <TableCell>
                <TextField
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => handleChange(index, 'rate', e.target.value)}
                  fullWidth
                  size="small"
                />
              </TableCell>

              <TableCell>
                <TextField
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) => handleChange(index, 'amount', e.target.value)}
                  fullWidth
                  size="small"
                />
              </TableCell>

              <TableCell>
                <IconButton onClick={() => handleRemoveRow(index)} color="error">
                  <RemoveCircle />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          startIcon={<AddCircle />}
          onClick={handleAddRow}
          variant="outlined"
          color="primary"
        >
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default ItemTable;


