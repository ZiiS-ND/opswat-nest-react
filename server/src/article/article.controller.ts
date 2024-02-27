import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDTO } from './article.dto';

@Controller()
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('create')
  login(@Body() data: ArticleDTO) {
    return this.articleService.createArticle(data);
  }
}
