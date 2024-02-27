import { Injectable } from '@nestjs/common';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleDTO } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
  ) {}

  createArticle(data: ArticleDTO) {
    console.log(data);
  }
}
