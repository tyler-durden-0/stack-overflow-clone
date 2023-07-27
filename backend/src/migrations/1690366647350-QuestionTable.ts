import { MigrationInterface, QueryRunner } from "typeorm"

export class QuestionTable1690366647350 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists "question" (
              id                        serial4,
              author                    varchar not null,
              title                     varchar not null,
              description               varchar not null,
              rating                    int4 not null default 0,
              "dateOfCreation"          timestamp not null default now(),
              "dateOfUpdate"            timestamp not null default now(),
              "userId" INTEGER REFERENCES "user" ("id"),
              primary key (id)
            );
        `);
    }
    // "userId" INTEGER REFERENCES "user" ("id"),

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
