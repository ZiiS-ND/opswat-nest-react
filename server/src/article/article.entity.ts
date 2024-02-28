import { Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  // OneToMany,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ArticleSO } from './article.dto';
import { UserEntity } from 'src/user/user.entity';

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

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'user_favorite_articles',
  })
  favoriteUsers: UserEntity[];

  sanitizeObject = (option?: SanitizeArticleOptions): ArticleSO => {
    const { id, createdAt, title, body, favoritesCount } = this;
    const responseObj = {
      id,
      createdAt,
      title,
      body,
      favoritesCount,
    };
    if (option?.withFavorite) {
      if (this.favoriteUsers.find((user) => user.id === option?.userId))
        Object.assign(responseObj, { favorited: true });
    }
    return responseObj;
  };
}

type SanitizeArticleOptions = {
  withFavorite?: boolean;
  userId?: string;
};
