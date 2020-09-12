import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => Author, { nullable: false, eager: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;
  @Column({ name: 'authorId' })
  authorId: number;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable({ name: 'track_tag' })
  tags: Tag[];

  @Column({ nullable: true })
  fileName: string;
}
