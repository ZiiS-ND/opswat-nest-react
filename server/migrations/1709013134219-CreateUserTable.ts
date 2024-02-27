import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1709013134219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            comment: 'User Primary ID',
          },
          {
            name: 'email',
            type: 'string',
            isUnique: true,
            comment: 'User Email',
          },
          {
            name: 'username',
            type: 'string',
            isUnique: true,
            comment: 'Username',
          },
          {
            name: 'fullname',
            type: 'string',
            comment: 'User Fullname',
          },
          {
            name: 'password',
            type: 'string',
            comment: 'User Password',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            comment: 'User Created Time',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            comment: 'User Last Updated Time',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
