import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Author } from './author.entity';
import { Tag } from './tag.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number; // in seconds

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Author, { nullable: false })
  author: Author;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
