import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { HumanInformationsService } from 'src/human-informations/human-informations.service';
import { PrismaService } from 'src/prisma.service';
import { HumanInformation } from 'src/human-informations/entities/human-information.entity';

@Module({
  controllers: [AuthorsController],
  providers: [PrismaService, HumanInformationsService, AuthorsService],
})
export class AuthorsModule {}