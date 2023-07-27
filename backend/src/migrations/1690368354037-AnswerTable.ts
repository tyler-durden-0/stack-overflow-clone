import { MigrationInterface, QueryRunner } from "typeorm"

export class AnswerTable1690368354037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists "answer" (
                id                          serial4,
                author                      varchar not null,
                text                        varchar not null,
                rating                      int4 not null default 0,
                "dateOfCreation"            timestamp not null default now(),
                "dateOfUpdate"              timestamp not null default now(),
                "userId"                    INTEGER REFERENCES "user" ("id"),
                "questionId"                INTEGER REFERENCES "question" ("id"),
                primary key (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
