import { MiddlewareConsumer, Module } from '@nestjs/common';
import {
  UserModule,
  AuthModule,
  MailModule,
  TransactionModule,
  CategoryModule,
  StoreModule,
  ProductModule,
  OrderModule,
  PaymentModule,
  RoleModule,
  StatisticModule,
  PermissionModule,
  NotificationModule,
  StoreRatingModule,
  TagModule,
} from './modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database';
import express from 'express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file';
import { EventModule } from './event';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: join(
            __dirname,
            configService.get<string>('environment') === 'development'
              ? '../../../dist/packages'
              : '../',
            'web'
          ),
        },
      ],
      inject: [ConfigService],
    }),
    DatabaseModule,
    FileModule,
    MailModule,
    UserModule,
    AuthModule,
    TransactionModule,
    CategoryModule,
    StoreModule,
    ProductModule,
    OrderModule,
    PaymentModule,
    RoleModule,
    PermissionModule,
    StatisticModule,
    NotificationModule,
    StoreRatingModule,
    TagModule,
    EventModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.static(configuration().multer.dest))
      .forRoutes('/files');
  }
}
