import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUniqueCodeToUserTable1686195029774 implements MigrationInterface {
    name = 'AddedUniqueCodeToUserTable1686195029774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "unique_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_de590887164f7c6366b7b053181" UNIQUE ("unique_code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_de590887164f7c6366b7b053181"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "unique_code"`);
    }

}
