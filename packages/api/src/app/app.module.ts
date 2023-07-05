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
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database';
import express from 'express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file';

const isDevelopment = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        isDevelopment ? '../../../dist/packages' : '../',
        'web'
      ),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.static(configuration().multer.dest))
      .forRoutes('/files');
  }
}
