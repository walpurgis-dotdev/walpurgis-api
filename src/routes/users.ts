import { FastifyInstance } from 'fastify';
import createOrGetConnection from '../db';

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.get('/all_users', async (req, res) => {
    const con = await createOrGetConnection();
    const result = await con
      .createQueryBuilder()
      .select('user')
      .from('user', 'user')
      .getMany();

    return res.status(200).send(result);
  });
}
