import fastify, { FastifyRequest, FastifyInstance } from 'fastify';
import fastifyRawBody from 'fastify-raw-body';
import { loggerConfig } from './logger';
import routes from './routes';

export default async function app(): Promise<FastifyInstance> {
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
