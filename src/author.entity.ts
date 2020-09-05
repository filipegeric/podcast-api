import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Track } from './track.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(
    () => Track,
    (track) => track.author,
  )
  tracks: Track[];
}
