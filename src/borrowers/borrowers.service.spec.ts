import { Test, TestingModule } from '@nestjs/testing';
import { BorrowersService } from './borrowers.service';

describe('BorrowersService', () => {
  let service: BorrowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowersService],
    }).compile();

    service = module.get<BorrowersService>(BorrowersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
