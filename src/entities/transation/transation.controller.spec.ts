import { Test, TestingModule } from '@nestjs/testing';
import { TransationController } from './transation.controller';
import { TransationService } from './transation.service';

describe('TransationController', () => {
  let controller: TransationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransationController],
      providers: [TransationService],
    }).compile();

    controller = module.get<TransationController>(TransationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
