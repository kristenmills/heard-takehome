import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useTransactions } from './hooks';

export function TransactionsList() {
  const { fetchTransactions, transactions } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, []);

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
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(
            ({
              transactionId,
              description,
              amount,
              fromAccount,
              toAccount,
              createdAt,
            }) => (
              <TableRow key={transactionId}>
                <TableCell>{transactionId}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{fromAccount}</TableCell>
                <TableCell>{toAccount}</TableCell>
                <TableCell>{createdAt}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
