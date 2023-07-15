import { Global, Module } from '@nestjs/common';
import { ProductController } from './controllers';
import { ProductService } from './services';

@Global()
@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
