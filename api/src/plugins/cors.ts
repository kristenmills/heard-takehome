import fp from 'fastify-plugin';
import cors from '@fastify/cors';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async (fastify) => {
  fastify.register(cors, {
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  });
});
