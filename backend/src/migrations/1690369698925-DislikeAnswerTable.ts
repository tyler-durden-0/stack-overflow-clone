import { MigrationInterface, QueryRunner } from "typeorm"

export class DislikeAnswerTable1690369698925 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists "dislike_answer" (
                id                          serial4,
                "userId"                    integer,
                "answerId"                  integer,
                primary key (id),
                foreign key ("userId") references "user"("id") on delete cascade,
                foreign key ("answerId") references answer("id") on delete cascade
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
