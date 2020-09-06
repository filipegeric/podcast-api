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

  async getPodcasts(searchTerm?: string, tag?: number) {
    const where: FindConditions<Track> = {};
    if (searchTerm) {
      where.title = Like(`%${searchTerm}%`);
    }
    let tracks = await this.trackRepository.find({
      where,
    });
    if (tag) {
      tracks = tracks.filter((el) => el.tags.some((t) => t.id === tag));
    }
    return tracks;
  }

  getTags() {
    return this.tagRepository.find();
  }
}
