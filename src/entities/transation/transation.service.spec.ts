import { Test, TestingModule } from '@nestjs/testing';
import { TransationService } from './transation.service';

describe('TransationService', () => {
  let service: TransationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransationService],
    }).compile();

    service = module.get<TransationService>(TransationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
