import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArticleTable1709013404595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            comment: 'Article Primary ID',
          },
          {
            name: 'title',
            type: 'string',
            isUnique: true,
            comment: 'Article Title',
          },
          {
            name: 'body',
            type: 'string',
            isUnique: true,
            comment: 'Article Content',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            comment: 'Article Created Time',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            comment: 'Article Last Updated Time',
          },
          {
            name: 'favourite_count',
            type: 'int',
            default: 0,
            comment: 'Article Favourite Count',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articles');
  }
}
