import { MigrationInterface, QueryRunner } from "typeorm"

export class DislikeQuestionTable1690369589822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists "dislike_question" (
                id                          serial4,
                "userId"                    integer,
                "questionId"                integer,
                primary key (id),
                foreign key ("userId") references "user"("id") on delete cascade,
                foreign key ("questionId") references question("id") on delete cascade
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
