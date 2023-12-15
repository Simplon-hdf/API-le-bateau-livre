import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaService } from 'src/prisma.service';
import { HumanInformationsService } from 'src/human-informations/human-informations.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, PrismaService, HumanInformationsService],
})
export class EmployeesModule {}
