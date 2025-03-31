import { useState } from 'react';
import type { Transaction } from './types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

interface TransactionFormProps {
  open: boolean;
  handleClose: () => void;
  transaction?: Partial<Transaction>;
  onSubmit: (transaction: Transaction) => void;
}

export function TransactionForm({
  transaction,
  onSubmit,
  open,
  handleClose,
}: TransactionFormProps) {
  const [form, setForm] = useState(transaction || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...form,
      amount: parseInt(form.amount as unknown as string, 10),
    } as Transaction);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
        },
      }}
    >
      <DialogTitle>
        {transaction ? 'Edit Transaction' : 'Add Transaction'}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="standard"
          name="transactionId"
          label="Transaction ID"
          value={form.transactionId}
          onChange={handleChange}
          disabled={!!transaction}
        />
        <TextField
          fullWidth
          variant="standard"
          name="description"
          label="Description"
          value={form.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="standard"
          type="number"
          name="amount"
          label="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="standard"
          name="fromAccount"
          label="From Account"
          value={form.fromAccount}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="standard"
          name="toAccount"
          label="To Account"
          value={form.toAccount}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">
          {transaction ? 'Update Transaction' : 'Add Transaction'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
