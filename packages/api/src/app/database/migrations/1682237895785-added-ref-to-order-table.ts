import { MigrationInterface, QueryRunner } from "typeorm";

export class addedRefToOrderTable1682237895785 implements MigrationInterface {
    name = 'addedRefToOrderTable1682237895785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "ref" SERIAL NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "ref"`);
    }

}
