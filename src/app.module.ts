import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AudioModule } from './audio/audio.module';
import { Author } from './audio/author.entity';
import { Tag } from './audio/tag.entity';
import { Track } from './audio/track.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

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
      entities: [Author, Track, Tag, User],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    AudioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
