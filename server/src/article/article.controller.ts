import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { ArticleDTO } from './article.dto';
import { ArticleService } from './article.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@ApiBearerAuth()
@Controller('article')
@UseGuards(new AuthGuard())
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('/')
  createArticle(@Body() data: ArticleDTO) {
    return this.articleService.createArticle(data);
  }

  @Put('/:id')
  updateAritcle(@Body() data: ArticleDTO, @Param('id') id: string) {
    return this.articleService.updateArticle(id, data);
  }

  @Get('/')
  getAllArticles() {
    return this.articleService.getAllArticle();
  }

  @Get('/:id')
  getArticle(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;

    return this.articleService.getArticle(id, userId);
  }

  @Delete('/:id')
  deleteArticle(@Param('id') id: string) {
    return this.articleService.deleteArticle(id);
  }

  @Post('/:id/favorite')
  favoriteArticle(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;

    return this.articleService.favoriteArticle(id, userId);
  }

  @Delete('/:id/favorite')
  unfavoriteArticle(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;

    return this.articleService.unfavoriteArticle(id, userId);
  }
}
