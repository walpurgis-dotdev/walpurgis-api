import { FastifyInstance } from 'fastify';
import users from './users';

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.register(users, { prefix: '/v1/users' });
}
