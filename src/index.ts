require('dotenv').config()
import fastify from 'fastify';

const port:any = process.env.PORT || 3000;
const app = fastify({ logger: true });

app.get('/', async (req, res) => {
  return "I've been thinking about you a lot lately, and I'vee realized that I have feelings for you that go beyond friendship!\n";
});

app.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`The place my heart longs for ${address}`);
});
