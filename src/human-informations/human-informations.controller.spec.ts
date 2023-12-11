import { Test, TestingModule } from '@nestjs/testing';
import { HumanInformationsController } from './human-informations.controller';
import { HumanInformationsService } from './human-informations.service';

describe('HumanInformationsController', () => {
  let controller: HumanInformationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HumanInformationsController],
      providers: [HumanInformationsService],
    }).compile();

    controller = module.get<HumanInformationsController>(HumanInformationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
