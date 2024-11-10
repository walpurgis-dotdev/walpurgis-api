import createOrGetConnection from '../src/db';

async function teardown() {
  const con = await createOrGetConnection();
  await con.destroy();
}

module.exports = teardown;
