import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { GlobalClassSerializerPipe } from './shared/pipes/global-class-serializer.pipe';
import { AllExceptionFilter } from './shared/filters/all-exception.filter';
import { useContainer } from 'class-validator';
import { GlobalValidationPipe } from './shared/pipes/global-validation.pipe';

// Config
async function registerConfiguration(app: INestApplication, whiteLists: any) {
    app.enableCors({
        origin: whiteLists,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
    });

    // app.use(json({ limit: '500mb' }));
    app.use(helmet());
    app.enableShutdownHooks();
}

// Logger
async function registerLogger(app: INestApplication, env: string, loggerlevels: LogLevel[]) {
    let loggerLevels: LogLevel[];
    if (env === 'prod') {
        loggerLevels = loggerlevels;
    } else {
        loggerLevels = ['log', 'error', 'warn', 'debug', 'verbose'];
    }

    app.useLogger(loggerLevels);
}

// Filters
function registerGlobalFilters(app: INestApplication) {
    const { httpAdapter } = app.get<HttpAdapterHost>(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
}

// Global Pipes
function registerGlobalPipes(app: INestApplication) {
    app.useGlobalPipes(new GlobalValidationPipe().default());
}

// Interceptors
function registerGlobalInterceptors(app: INestApplication) {
    const reflector = app.get(Reflector);

    app.useGlobalInterceptors(new GlobalClassSerializerPipe(reflector).default());
}

// Main
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService>(ConfigService);

    const host = configService.get('app.host');
    const port = configService.get('app.port');
    const env = configService.get('app.env');
    const version = configService.get('app.version');
    const whiteLists = configService.get('app.allowedOrigin');
    const loggerLevels = configService.get('logger.levels');

    app.setGlobalPrefix(`api/${version}`);

    registerConfiguration(app, whiteLists);
    registerLogger(app, env, loggerLevels);
    registerGlobalPipes(app);
    registerGlobalFilters(app);
    registerGlobalInterceptors(app);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.listen(port);

    console.info(`App is running at http://${host}:${port}, env: ${env}`);
}
bootstrap();
