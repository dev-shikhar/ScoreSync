import { createClient } from 'redis';

const client = createClient();

await client.connect();
await client.del('noderedis:jsondata');

export default client;