import { Test, TestingModule } from '@nestjs/testing';
import { AmoCrmConnectionService } from './amo-crm-connection.service';

describe('AmoCrmConnectionService', () => {
  let service: AmoCrmConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmoCrmConnectionService],
    }).compile();

    service = module.get<AmoCrmConnectionService>(AmoCrmConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
