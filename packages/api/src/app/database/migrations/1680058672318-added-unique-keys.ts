import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUniqueKeys1680058672318 implements MigrationInterface {
    name = 'addedUniqueKeys1680058672318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "UQ_8dad765629e83229da6feda1c1d" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_08e86fada7ae67b1689f948e83e" UNIQUE ("title")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_62ffe5d5fe07c3ae04c87711b6" ON "categories" ("parent_id", "title", "type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_62ffe5d5fe07c3ae04c87711b6"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_08e86fada7ae67b1689f948e83e"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "UQ_8dad765629e83229da6feda1c1d"`);
    }

}
