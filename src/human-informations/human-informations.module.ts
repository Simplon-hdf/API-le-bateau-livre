import { Module } from '@nestjs/common';
import { HumanInformationsService } from './human-informations.service';
import { HumanInformationsController } from './human-informations.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HumanInformationsController],
  providers: [HumanInformationsService, PrismaService],
})
export class HumanInformationsModule {}
