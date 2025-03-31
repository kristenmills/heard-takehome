import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import type { Transaction } from './types';

interface TransactionListProps {
  transactions: Transaction[];
  onEditClick: (transaction: Transaction) => void;
  onDeleteClick: (transactionId: string) => void;
}

export function TransactionsList({
  transactions,
  onEditClick,
  onDeleteClick,
}: TransactionListProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>From Account</TableCell>
            <TableCell>To Account</TableCell>
            <TableCell>Transaction Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.transactionId}>
              <TableCell>{transaction.transactionId}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.fromAccount}</TableCell>
              <TableCell>{transaction.toAccount}</TableCell>
              <TableCell>{transaction.createdAt}</TableCell>
              <TableCell>
                <Button onClick={() => onEditClick(transaction)}>Edit</Button>
                <Button
                  onClick={() => onDeleteClick(transaction.transactionId)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
