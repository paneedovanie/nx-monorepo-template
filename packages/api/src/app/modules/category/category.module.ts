import { Module } from '@nestjs/common';
import { CategoryController } from './controllers';
import { CategoryService } from './services';
import { ProductService } from '../product';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, ProductService],
})
export class CategoryModule {}
