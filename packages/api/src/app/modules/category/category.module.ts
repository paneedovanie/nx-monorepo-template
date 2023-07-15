import { Global, Module } from '@nestjs/common';
import { CategoryController } from './controllers';
import { CategoryService } from './services';

@Global()
@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
