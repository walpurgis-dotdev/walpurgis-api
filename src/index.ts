import fastify from "fastify";

const app = fastify({ logger: true });

app.get("/", async (req, res) => {
  return "I've been thinking about you a lot lately, and I'vee realized that I have feelings for you that go beyond friendship!\n";
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`The place my heart longs for ${address}`);
});
