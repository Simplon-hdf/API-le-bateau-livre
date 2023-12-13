import { Module } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { BorrowersController } from './borrowers.controller';
import { PrismaService } from 'src/prisma.service';
import { HumanInformationsService } from 'src/human-informations/human-informations.service';

@Module({
  controllers: [BorrowersController],
  providers: [BorrowersService, PrismaService, HumanInformationsService],
})
export class BorrowersModule {}
