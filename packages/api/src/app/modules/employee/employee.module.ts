import { Global, Module } from '@nestjs/common';
import { EmployeeController } from './controllers';
import { EmployeeService } from './services';

@Global()
@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
