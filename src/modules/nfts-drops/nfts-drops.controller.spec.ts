import { Test, TestingModule } from '@nestjs/testing';
import { NftsDropsController } from './nfts-drops.controller';

describe('NftsDropsController', () => {
  let controller: NftsDropsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftsDropsController],
    }).compile();

    controller = module.get<NftsDropsController>(NftsDropsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
