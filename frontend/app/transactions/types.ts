export interface Transaction {
  transactionId: string;
  description: string;
  amount: number;
  fromAccount: string;
  toAccount: string;
  createdAt: string;
}
