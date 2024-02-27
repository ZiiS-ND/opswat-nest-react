import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ArticleDTO } from './article.dto';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createArticle = async (data: ArticleDTO) => {
    const article = this.articleRepository.create(data);
    await this.articleRepository.save(article);
  };

  getAllArticle = async () => {
    const articles = await this.articleRepository.find();

    return articles;
  };

  updateArticle = async (id: string, data: ArticleDTO) => {
    const article = await this.articleRepository.findOneByOrFail({ id });

    await this.articleRepository.update({ id }, data);

    return article;
  };

  deleteArticle = async (id: string) => {
    const article = await this.articleRepository.findOneByOrFail({ id });

    await this.articleRepository.remove(article);

    return article;
  };

  favoriteArticle = async (id: string, userId: string) => {
    const article = await this.articleRepository.findOneByOrFail({ id });
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    user.favoriteArticles = [...user.favoriteArticles, article];
    await this.userRepository.save(user);

    return article;
  };

  unfavoriteArticle = async (id: string, userId: string) => {
    const user = await this.userRepository.findOneOrFail({
      relations: {
        favoriteArticles: true,
      },
      where: { id: userId },
    });
    const article = await this.articleRepository.findOneByOrFail({ id });

    user.favoriteArticles = user.favoriteArticles.filter((article) => {
      return article.id !== id;
    });
    await this.userRepository.save(user);

    return article;
  };
}
