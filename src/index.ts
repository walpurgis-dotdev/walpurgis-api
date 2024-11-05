import 'reflect-metadata';
import fastify, { FastifyInstance } from 'fastify';
import fastifyRawBody from 'fastify-raw-body';
import { loggerConfig } from './logger';
import routes from './routes';
import createOrGetConnection from './db';

export default async function app(): Promise<FastifyInstance> {
  await createOrGetConnection();

  const app = fastify({
    logger: loggerConfig,
    disableRequestLogging: true,
    trustProxy: true,
  });

  app.register(fastifyRawBody, {
    field: 'rawBody',
    global: false,
    encoding: 'utf8',
    runFirst: true,
  });

  app.register(routes, { prefix: '/' });

  return app;
}
