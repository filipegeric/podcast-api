import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Author } from './author.entity';
import { Tag } from './tag.entity';
import { Track } from './track.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'dev',
      password: 'dev',
      database: 'podcast-db',
      entities: [Author, Track, Tag],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Track, Tag]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
