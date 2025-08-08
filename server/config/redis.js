import { createClient } from 'redis';

const client = createClient({url: process.env.REDIS_URL,});

await client.connect();
await client.del('noderedis:jsondata');

export default client;
