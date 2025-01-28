import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
    databaseUrl: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_NAME,
    authSource: process.env.MONGODB_AUTH,
    replicaSet: process.env.MONGODB_REPLICA_SET,
    caPath: process.env.MONGODB_CA_PATH,
    certPath: process.env.MONGODB_CERT_PATH,
}));
