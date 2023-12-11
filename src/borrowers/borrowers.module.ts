import { Module } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { BorrowersController } from './borrowers.controller';

@Module({
  controllers: [BorrowersController],
  providers: [BorrowersService],
})
export class BorrowersModule {}
