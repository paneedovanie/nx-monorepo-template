import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedStoreRatingTable1687397083333 implements MigrationInterface {
    name = 'AddedStoreRatingTable1687397083333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store_ratings" ("store_id" uuid NOT NULL, "user_id" uuid NOT NULL, "rating" integer NOT NULL, "comment" text, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7527b31e2360eeea246891eb3a1" PRIMARY KEY ("store_id", "user_id"))`);
        await queryRunner.query(`ALTER TABLE "store_ratings" ADD CONSTRAINT "FK_574f70e70e434001e64933f4486" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_ratings" ADD CONSTRAINT "FK_8253f772dc0f8d973f23335e273" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_ratings" DROP CONSTRAINT "FK_8253f772dc0f8d973f23335e273"`);
        await queryRunner.query(`ALTER TABLE "store_ratings" DROP CONSTRAINT "FK_574f70e70e434001e64933f4486"`);
        await queryRunner.query(`DROP TABLE "store_ratings"`);
    }

}
