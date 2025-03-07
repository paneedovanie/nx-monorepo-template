import entities from '../database/entities';
import seeds from '../database/seeds';
import factories from '../database/factories';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { resolve } from 'path';

export default () => {
  const isProduction = process.env.ENVIRONMENT === 'production';

  return {
    environment: process.env.ENVIRONMENT ?? 'development',
    protocol: process.env.PROTOCOL ?? 'http',
    frontEndUrl: process.env.FRONT_END_URL ?? 'http://localhost:4200',
    baseUrl:
      process.env.BASE_URL ??
      `http://localhost:${
        process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
      }`,
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
      entities,
      migrations: [resolve(__dirname, '../database/migrations/*.{ts,js}')],
      seeds,
      factories,
      autoLoadEntities: true,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      // logging: true,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
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
        (isProduction ? './' : '../../../packages/api/') + 'storage/uploads'
      ),
    },
    cloudinary: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: process.env.CLOUDINARY_SECURE,
    },
    s3: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      bucket: process.env.S3_BUCKET,
      baseUrl: process.env.S3_BASE_URL,
      region: process.env.S3_REGION ?? 'us-east-1',
    },
  };
};
