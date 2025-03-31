import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { TransactionsList } from './transaction-list';
import { useTransactions } from './hooks';
import { TransactionForm } from './transaction-form';
import type { Transaction } from './types';

export function Transactions() {
  const { fetchTransactions, transactions, updateTransaction, addTransaction } =
    useTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [initialTransaction, setTransaction] = useState<Transaction>();

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleAddClick = () => {
    setTransaction(undefined);
    setModalOpen(true);
  };

  const handleSubmit = (transaction: Transaction) => {
    if (initialTransaction) {
      updateTransaction(transaction);
    } else {
      addTransaction(transaction);
    }
    setModalOpen(false);
  };

  const handleEditClick = (transaction: Transaction) => {
    setTransaction(transaction);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <Typography variant="h4">Transactions</Typography>
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add Transaction
      </Button>
      <TransactionsList transactions={transactions} />

      {modalOpen && (
        <TransactionForm
          open={modalOpen}
          handleClose={handleClose}
          transaction={initialTransaction}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
