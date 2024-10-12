import { Test, TestingModule } from '@nestjs/testing';
import { ServicetoproviderService } from './servicetoprovider.service';

describe('ServicetoproviderService', () => {
  let service: ServicetoproviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicetoproviderService],
    }).compile();

    service = module.get<ServicetoproviderService>(ServicetoproviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
