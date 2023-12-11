import { Module } from '@nestjs/common';
import { HumanInformationsService } from './human-informations.service';
import { HumanInformationsController } from './human-informations.controller';

@Module({
  controllers: [HumanInformationsController],
  providers: [HumanInformationsService],
})
export class HumanInformationsModule {}
