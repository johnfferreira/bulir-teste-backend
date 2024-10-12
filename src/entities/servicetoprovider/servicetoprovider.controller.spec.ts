import { Test, TestingModule } from '@nestjs/testing';
import { ServicetoproviderController } from './servicetoprovider.controller';
import { ServicetoproviderService } from './servicetoprovider.service';

describe('ServicetoproviderController', () => {
  let controller: ServicetoproviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicetoproviderController],
      providers: [ServicetoproviderService],
    }).compile();

    controller = module.get<ServicetoproviderController>(ServicetoproviderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
