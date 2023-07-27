import { MigrationInterface, QueryRunner } from "typeorm"

export class LikeAnswerTable1690369301387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists "like_answer" (
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
