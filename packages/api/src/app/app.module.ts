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
} from './modules';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database';
import { PermissionModule } from './modules/permission';
import express from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
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
