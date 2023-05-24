import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedImageToProductsTable1684801873249 implements MigrationInterface {
    name = 'AddedImageToProductsTable1684801873249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image"`);
    }

}
