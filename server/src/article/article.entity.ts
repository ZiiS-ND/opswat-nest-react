import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  // OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
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
}
