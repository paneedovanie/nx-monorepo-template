import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTagsTable1687612945241 implements MigrationInterface {
    name = 'AddedTagsTable1687612945241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f778ee47dc8de756428f20a1d6" ON "tags" ("title", "type") `);
        await queryRunner.query(`CREATE TABLE "store_tags" ("stores_id" uuid NOT NULL, "tags_id" uuid NOT NULL, CONSTRAINT "PK_137cf3c4eca36a09a5d921d97ec" PRIMARY KEY ("stores_id", "tags_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c492ac245d7b9f64322e7c3783" ON "store_tags" ("stores_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e16c94ee0ab3a6bbc70226c01" ON "store_tags" ("tags_id") `);
        await queryRunner.query(`ALTER TABLE "stores" ADD "rating" integer`);
        await queryRunner.query(`ALTER TABLE "store_tags" ADD CONSTRAINT "FK_c492ac245d7b9f64322e7c37836" FOREIGN KEY ("stores_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "store_tags" ADD CONSTRAINT "FK_5e16c94ee0ab3a6bbc70226c013" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_tags" DROP CONSTRAINT "FK_5e16c94ee0ab3a6bbc70226c013"`);
        await queryRunner.query(`ALTER TABLE "store_tags" DROP CONSTRAINT "FK_c492ac245d7b9f64322e7c37836"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "rating"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e16c94ee0ab3a6bbc70226c01"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c492ac245d7b9f64322e7c3783"`);
        await queryRunner.query(`DROP TABLE "store_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f778ee47dc8de756428f20a1d6"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
