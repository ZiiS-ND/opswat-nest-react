import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    return article;
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
    const user = await this.userRepository.findOneOrFail({
      relations: {
        favoriteArticles: true,
      },
      where: { id: userId },
    });
    if (user.favoriteArticles.some((a) => a.id === article.id)) {
      throw new HttpException('Already favorited this', HttpStatus.CONFLICT);
    }

    user.favoriteArticles.push(article);
    article.favoritesCount = article.favoritesCount + 1;

    await this.userRepository.save(user);
    await this.articleRepository.save(article);

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
    if (!user.favoriteArticles.some((a) => a.id === article.id)) {
      throw new HttpException(
        'You didnt favorite this before, why unfavorite now?',
        HttpStatus.BAD_REQUEST,
      );
    }

    article.favoritesCount = article.favoritesCount - 1;

    console.log(id);

    user.favoriteArticles = user.favoriteArticles.filter((article) => {
      return article.id !== id;
    });

    console.log(user.favoriteArticles);

    await this.userRepository.save(user);
    await this.articleRepository.save(article);

    return article;
  };
}
