import { FastifyPluginAsync } from 'fastify';

const example: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async function (request, reply) {
    return 'this is an example';
  });

  fastify.post('/', async (request, reply) => {
    return 'this is an example';
  });

  fastify.get('/:transactionId', async (request, reply) => {
    return 'this is an example';
  });

  fastify.put('/:transactionId', async (request, reply) => {
    return 'this is an example';
  });

  fastify.delete('/:transactionId', async (request, reply) => {
    return 'this is an example';
  });
};

export default example;
