import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleEntity } from './article/article.entity';
import { ArticleModule } from './article/article.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'demo',
      entities: [UserEntity, ArticleEntity],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
