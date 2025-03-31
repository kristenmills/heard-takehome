import Typography from '@mui/material/Typography';
import { TransactionsList } from './transaction-list';

export function Transactions() {
  return (
    <div>
      <Typography variant="h4">Transactions</Typography>
      <TransactionsList />
    </div>
  );
}
