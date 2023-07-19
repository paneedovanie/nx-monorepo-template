import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedStoreConfig1689733824908 implements MigrationInterface {
    name = 'AddedStoreConfig1689733824908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_5848ba82e61b83e2aa416447a15"`);
        await queryRunner.query(`ALTER TABLE "stores" ADD "config" jsonb`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "id" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "id"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "config"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_5848ba82e61b83e2aa416447a15" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
