import { Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';

@Module({
  controllers: [BorrowsController],
  providers: [BorrowsService],
})
export class BorrowsModule {}
