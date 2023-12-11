import { Test, TestingModule } from '@nestjs/testing';
import { HumanInformationsService } from './human-informations.service';

describe('HumanInformationsService', () => {
  let service: HumanInformationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HumanInformationsService],
    }).compile();

    service = module.get<HumanInformationsService>(HumanInformationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
