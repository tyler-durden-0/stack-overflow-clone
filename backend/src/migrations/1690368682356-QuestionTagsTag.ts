import { MigrationInterface, QueryRunner } from "typeorm"

export class QuestionTagsTagTable1690368682356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists "question_tags_tag" (
                "questionId"                INTEGER REFERENCES "question" ("id"),
                "tagId"                     INTEGER REFERENCES "tag" ("id")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
