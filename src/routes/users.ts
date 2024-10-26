import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.get("/me", async (req, res) => {
    return "I've been thinking about you a lot lately, and I'vee realized that I have feelings for you that go beyond friendship!\n";
  });
}
