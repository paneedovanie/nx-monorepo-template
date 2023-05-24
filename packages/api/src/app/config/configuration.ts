import {
  UserEntity,
  CredentialEntity,
  TransactionEntity,
  CategoryEntity,
  PermissionEntity,
  RoleEntity,
  StoreEntity,
  ProductEntity,
  OrderEntity,
  PaymentEntity,
} from '../database';
import migrations from '../database/migrations';
import seeds from '../database/seeds';
import factories from '../database/factories';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { resolve } from 'path';

const isDevelopment = process.env.NODE_ENV === 'development';

console.log(
  resolve(
    __dirname,
    (isDevelopment ? '../../../packages/api/' : './') + 'storage/uploads'
  )
);

export default () => ({
  protocol: process.env.PROTOCOL ?? 'http',
  host: process.env.HOST ?? 'localhost',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  database: {
    type: process.env.DATABASE_TYPE as 'postgres',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5432,
    username: process.env.DATABASE_USERNAME ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'password',
    database: process.env.DATABASE_NAME ?? 'users_ms',
    entities: [
      UserEntity,
      CredentialEntity,
      TransactionEntity,
      CategoryEntity,
      PermissionEntity,
      RoleEntity,
      StoreEntity,
      ProductEntity,
      OrderEntity,
      PaymentEntity,
    ],
    migrations,
    seeds,
    factories,
    autoLoadEntities: true,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    logging: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'supersecret',
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN ?? '60s' },
  },
  mail: {
    transport: {
      host: process.env.MAIL_HOST ?? 'smtp.gmail.com',
      port: process.env.MAIL_PORT ?? 465,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USERNAME ?? '',
        pass: process.env.MAIL_PASSWORD ?? '',
      },
    },
    from: process.env.MAIL_FROM ?? 'admin@email.com',
  },
  multer: {
    dest: resolve(
      __dirname,
      (isDevelopment ? '../../../packages/api/' : './') + 'storage/uploads'
    ),
  },
});
