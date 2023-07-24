import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTaxToOrdersTable1690163142481 implements MigrationInterface {
    name = 'AddedTaxToOrdersTable1690163142481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "tax" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "tax"`);
    }

}
