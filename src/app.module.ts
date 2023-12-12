import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BorrowersModule } from './borrowers/borrowers.module';
import { EmployeesModule } from './employees/employees.module';
import { BorrowsModule } from './borrows/borrows.module';
import { HumanInformationsModule } from './human-informations/human-informations.module';

@Module({
  imports: [BorrowersModule, EmployeesModule, BorrowsModule, HumanInformationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
