import { createClient } from 'redis';

const url = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({ url: url });

await client.connect();
await client.del('noderedis:jsondata');

export default client;
