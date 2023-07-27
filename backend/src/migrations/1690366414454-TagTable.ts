import { MigrationInterface, QueryRunner } from "typeorm"

export class TagTable1690366414454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists "tag" (
              id                        serial4,
              name                      varchar not null,
              description               varchar not null,
              primary key (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
