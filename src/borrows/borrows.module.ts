import { Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';
import { EmployeesService } from 'src/employees/employees.service';
import { BorrowersService } from 'src/borrowers/borrowers.service';
import { PrismaService } from 'src/prisma.service';
import { HumanInformationsService } from 'src/human-informations/human-informations.service';

@Module({
  controllers: [BorrowsController],
  providers: [BorrowsService, EmployeesService, BorrowersService, PrismaService, HumanInformationsService],
})
export class BorrowsModule {}
