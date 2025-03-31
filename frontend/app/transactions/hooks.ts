import { useReducer, useState } from 'react';
import { type Transaction } from './types';

interface State {
  transactions: Transaction[];
}

const enum ActionType {
  FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS',
  ADD_TRANSACTION = 'ADD_TRANSACTION',
  UPDATE_TRANSACTION = 'UPDATE_TRANSACTION',
  REMOVE_TRANSACTION = 'REMOVE_TRANSACTION',
}

interface AddTransactionAction {
  type: ActionType.ADD_TRANSACTION;
  payload: Transaction;
}

interface RemoveTransactionAction {
  type: ActionType.REMOVE_TRANSACTION;
  payload: { transactionId: string };
}

interface FetchTransactionsAction {
  type: ActionType.FETCH_TRANSACTIONS;
  payload: Transaction[];
}

interface UpdateTransactionAction {
  type: ActionType.UPDATE_TRANSACTION;
  payload: Transaction;
}

type Action =
  | AddTransactionAction
  | RemoveTransactionAction
  | FetchTransactionsAction
  | UpdateTransactionAction;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case ActionType.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case ActionType.UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.transactionId === action.payload.transactionId
            ? action.payload
            : transaction,
        ),
      };
    case ActionType.REMOVE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) =>
            transaction.transactionId !== action.payload.transactionId,
        ),
      };
    default:
      return state;
  }
};

export function useTransactions() {
  const [{ transactions }, dispatch] = useReducer(reducer, {
    transactions: [],
  });

  const [errorState, setErrorState] = useState<string>();

  return {
    transactions,
    errorState,
    addTransaction: async (transaction: Transaction) => {
      setErrorState(undefined);
      const res = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        return setErrorState('Failed to create transaction');
      }

      const payload = await res.json();

      dispatch({ type: ActionType.ADD_TRANSACTION, payload });
    },
    removeTransaction: async (transactionId: string) => {
      setErrorState(undefined);
      const res = await fetch(
        `http://localhost:3000/transactions/${transactionId}`,
        {
          method: 'DELETE',
        },
      );
      if (!res.ok) {
        return setErrorState('Failed to delete transaction');
      }
      dispatch({
        type: ActionType.REMOVE_TRANSACTION,
        payload: { transactionId },
      });
    },
    fetchTransactions: async () => {
      setErrorState(undefined);
      const res = await fetch('http://localhost:3000/transactions');
      if (!res.ok) {
        return setErrorState('Failed to fetch transactions');
      }
      const data = await res.json();
      dispatch({
        type: ActionType.FETCH_TRANSACTIONS,
        payload: data,
      });
    },
    updateTransaction: async (transaction: Transaction) => {
      setErrorState(undefined);
      const res = await fetch(
        `http://localhost:3000/transactions/${transaction.transactionId}`,
        {
          method: 'PUT',
          body: JSON.stringify(transaction),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!res.ok) {
        return setErrorState('Failed to update transaction');
      }
      const payload = await res.json();
      dispatch({
        type: ActionType.UPDATE_TRANSACTION,
        payload,
      });
    },
  };
}
