import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { Author } from './author.entity';
import { Tag } from './tag.entity';
import { Track } from './track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Tag, Author])],
  controllers: [AudioController],
  providers: [AudioService],
})
export class AudioModule {}
