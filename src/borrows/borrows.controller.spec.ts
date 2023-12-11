import { Test, TestingModule } from '@nestjs/testing';
import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';

describe('BorrowsController', () => {
  let controller: BorrowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowsController],
      providers: [BorrowsService],
    }).compile();

    controller = module.get<BorrowsController>(BorrowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
