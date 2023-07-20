import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedSoftDeleteToStoreAndUpdatedCurrencyPrecision1689813520431 implements MigrationInterface {
    name = 'AddedSoftDeleteToStoreAndUpdatedCurrencyPrecision1689813520431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE BIGINT USING "price"::BIGINT;`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "amount" TYPE BIGINT USING "amount"::BIGINT;`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "amount_paid" TYPE BIGINT USING "amount_paid"::BIGINT;`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "total_cost" TYPE BIGINT USING "total_cost"::BIGINT;`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "change" TYPE BIGINT USING "change"::BIGINT;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE INT USING CASE WHEN "price" > 2147483647 THEN 2147483647 ELSE "price"::INT END;`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "amount" TYPE INT USING CASE WHEN "amount" > 2147483647 THEN 2147483647 ELSE "amount"::INT END;`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "amount_paid" TYPE INT USING CASE WHEN "amount_paid" > 2147483647 THEN 2147483647 ELSE "amount_paid"::INT END;`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "total_cost" TYPE INT USING CASE WHEN "total_cost" > 2147483647 THEN 2147483647 ELSE "total_cost"::INT END;`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "total_cost" TYPE INT USING CASE WHEN "change" > 2147483647 THEN 2147483647 ELSE "change"::INT END;`);
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "deleted_at"`);
    }

}
