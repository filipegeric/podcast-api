import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('podcasts')
  getPodcasts(@Query('q') searchTerm?: string, @Query('tag') tag?: string) {
    return this.appService.getPodcasts(searchTerm, parseInt(tag));
  }

  @Get('tags')
  getTags() {
    return this.appService.getTags();
  }
}
