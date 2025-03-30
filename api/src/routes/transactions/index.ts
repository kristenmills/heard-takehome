import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TransactionRequest {
  description: string;
  transactionId: string;
  amount: number;
  fromAccount: string;
  toAccount: string;
}

interface Params {
  transactionId: string;
}

const example: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    const transactions = await prisma.transaction.findMany();
    return transactions;
  });

  fastify.post<{
    Body: TransactionRequest;
  }>('/', async (req) => {
    const { transactionId, description, amount, fromAccount, toAccount } =
      req.body;
    const transaction = await prisma.transaction.create({
      data: {
        description,
        transactionId,
        amount,
        fromAccount,
        toAccount,
      },
    });
    return transaction;
  });

  fastify.get<{ Params: Params }>('/:transactionId', async (req) => {
    const { transactionId } = req.params;
    const transaction = await prisma.transaction.findUnique({
      where: { transactionId },
    });
    return transaction;
  });

  fastify.put<{
    Body: TransactionRequest;
    Params: Params;
  }>('/:transactionId', async (req) => {
    const { transactionId } = req.params;
    const { amount, fromAccount, toAccount, description } = req.body;
    const transaction = await prisma.transaction.update({
      where: { transactionId },
      data: {
        description,
        amount,
        fromAccount,
        toAccount,
      },
    });
    return transaction;
  });

  fastify.delete<{ Params: Params }>('/:transactionId', async (req) => {
    const { transactionId } = req.params;
    await prisma.transaction.delete({
      where: { transactionId },
    });
  });
};

export default example;
