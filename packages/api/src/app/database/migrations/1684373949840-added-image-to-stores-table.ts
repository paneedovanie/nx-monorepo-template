import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedImageToStoresTable1684373949840 implements MigrationInterface {
    name = 'AddedImageToStoresTable1684373949840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "image"`);
    }

}
