import { Test, TestingModule } from '@nestjs/testing';
import { NftsDropsService } from './nfts-drops.service';

describe('NftsDropsService', () => {
  let service: NftsDropsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftsDropsService],
    }).compile();

    service = module.get<NftsDropsService>(NftsDropsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
