import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedStoreCategoryRelation1688696773806 implements MigrationInterface {
    name = 'AddedStoreCategoryRelation1688696773806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "store_id" uuid`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_5848ba82e61b83e2aa416447a15" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_5848ba82e61b83e2aa416447a15"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "store_id"`);
    }

}