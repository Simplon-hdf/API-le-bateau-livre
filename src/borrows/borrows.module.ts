import { Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';
import { EmployeesService } from 'src/employees/employees.service';
import { BorrowersService } from 'src/borrowers/borrowers.service';

@Module({
  controllers: [BorrowsController],
  providers: [BorrowsService, EmployeesService, BorrowersService],
})
export class BorrowsModule {}
