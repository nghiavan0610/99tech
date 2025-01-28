import { registerAs } from '@nestjs/config';

export default registerAs('throttler', () => ({
    second: {
        ttl: Number(process.env.GLOBAL_THROTTLER_TTL_SECOND),
        limit: Number(process.env.GLOBAL_THROTTLER_LIMIT_SECOND),
    },
    minute: {
        ttl: Number(process.env.GLOBAL_THROTTLER_TTL_MINUTE),
        limit: Number(process.env.GLOBAL_THROTTLER_LIMIT_MINUTE),
    },
}));
