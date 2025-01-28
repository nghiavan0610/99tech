import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import path from 'path';

@Module({})
export class MongoModule {
    static load(): DynamicModule {
        return {
            module: MongoModule,
            imports: [
                MongooseModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => {
                        const isProd = configService.get('app.env') === 'prod';
                        const caPath = path.join(__dirname, configService.get('mongodb.caPath'));
                        const certPath = path.join(__dirname, configService.get('mongodb.certPath'));

                        return {
                            uri: configService.get('mongodb.databaseUrl'),
                            dbName: configService.get('mongodb.dbName'),
                            authSource: configService.get('mongodb.authSource'),

                            ...(isProd && {
                                replicaSet: configService.get('mongodb.replicaSet'),
                                readPreference: 'secondary',
                                tls: true,
                                tlsInsecure: true,
                                tlsCAFile: caPath,
                                tlsCertificateKeyFile: certPath,
                            }),
                        };
                    },
                    inject: [ConfigService],
                }),
            ],
        };
    }
}
