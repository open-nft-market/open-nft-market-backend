import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { MoreThan, UpdateResult } from 'typeorm';
import dayjs from 'dayjs';
import { InjectRepository } from '@nestjs/typeorm';
import { NftsDropsRepository } from './nfts-drops.repository';
import { NftDrop } from './nfts-drops.entity';

@Injectable()
export class NftsDropsService {
  constructor(
    @InjectRepository(NftsDropsRepository)
    public readonly dropRepository: NftsDropsRepository,
  ) {}

  findActiveDrops(): Promise<NftDrop[]> {
    return this.dropRepository.find({
      order: {
        priority: 'DESC',
        id: 'DESC',
      },
      where: {
        active: true,
        published: true,
        priority: MoreThan(0),
        deactivatedAt: MoreThan(dayjs().format()),
      },
      take: 16,
    });
  }

  findOneByDropID(dropID: string): Promise<NftDrop> {
    return this.dropRepository.findOne({
      relations: ['creator'],
      where: { dropID },
    });
  }

  findOneByID(id: number): Promise<NftDrop> {
    return this.dropRepository.findOne({
      where: { id },
    });
  }

  async save(data: Partial<NftDrop>): Promise<NftDrop> {
    return this.dropRepository.save({
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: 1,
      active: true,
      published: false,
      deactivatedAt: dayjs().add(Number(process.env.DROP_DEFAULT_ACTIVE_DURATION_DAYS), 'days').format(),
      ...data,
    });
  }

  publish(id: number, published = true): Promise<UpdateResult> {
    return this.dropRepository.update(id, {
      published,
    });
  }

  updateDrop(id: number, data: Partial<NftDrop>): Promise<UpdateResult> {
    return this.dropRepository.update(id, data);
  }
}
