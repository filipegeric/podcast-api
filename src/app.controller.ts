import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('podcasts')
  getPodcasts(@Query('q') searchTerm?: string) {
    return this.appService.getPodcasts(searchTerm);
  }

  @Get('podcasts/:id')
  getSinglePodcast(@Param('id', ParseIntPipe) id: number) {
    // TODO:
    return { id };
  }

  @Get('tags')
  getTags() {
    return this.appService.getTags();
  }
}
