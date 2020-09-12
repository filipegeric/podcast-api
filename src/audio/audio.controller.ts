import { Controller, Get, Query } from '@nestjs/common';

import { AudioService } from './audio.service';

@Controller()
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('podcasts')
  getPodcasts(@Query('q') searchTerm?: string, @Query('tag') tag?: string) {
    return this.audioService.getPodcasts(searchTerm, parseInt(tag));
  }

  @Get('tags')
  getTags() {
    return this.audioService.getTags();
  }
}
