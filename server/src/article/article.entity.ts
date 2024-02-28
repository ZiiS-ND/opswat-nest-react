import { Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  // OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleSO } from './article.dto';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  @Length(0, 10000)
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'int',
    default: 0,
  })
  favoritesCount: number;

  sanitizeObject = (): ArticleSO => {
    const { id, createdAt, title, body, favoritesCount } = this;
    const responseObj = { id, createdAt, title, body, favoritesCount };
    return responseObj;
  };
}
