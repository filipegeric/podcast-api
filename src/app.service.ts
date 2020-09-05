import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Like, Repository } from 'typeorm';

import { Tag } from './tag.entity';
import { Track } from './track.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  getPodcasts(searchTerm?: string) {
    const where: FindConditions<Track> = {};
    if (searchTerm) {
      where.title = Like(`%${searchTerm}%`);
    }
    return this.trackRepository.find({
      where,
      relations: ['author', 'tags'],
    });
  }

  getTags() {
    return this.tagRepository.find();
  }
}
