import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1689666662369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        create table if not exists "user" (
          id                       serial4,
          "firstName"                varchar not null,
          "lastName"                 varchar not null,
          password                 varchar not null,
          email                    varchar not null,
          "isAdmin"                  boolean not null,
          primary key (id),
          unique(email)
        );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
