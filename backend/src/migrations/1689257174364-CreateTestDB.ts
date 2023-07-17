import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTestDB1689257174364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const databaseExists = await queryRunner.hasDatabase("test");

        if (!databaseExists) {
          // Завершаем текущую транзакцию (если есть)
          await queryRunner.commitTransaction();
    
          // Выполняем CREATE DATABASE за пределами транзакции
          await queryRunner.query('CREATE DATABASE "test"');
    
          // Запускаем новую транзакцию
          await queryRunner.startTransaction();
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const databaseExists = await queryRunner.hasDatabase("test");

        if (databaseExists) {
          // Завершаем текущую транзакцию (если есть)
          await queryRunner.commitTransaction();
    
          // Выполняем DROP DATABASE за пределами транзакции
          await queryRunner.query('DROP DATABASE "test"');
    
          // Запускаем новую транзакцию
          await queryRunner.startTransaction();
        }
    }

}
