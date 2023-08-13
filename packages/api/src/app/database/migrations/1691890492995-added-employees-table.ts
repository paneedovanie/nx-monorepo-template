import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEmployeesTable1691890492995 implements MigrationInterface {
    name = 'AddedEmployeesTable1691890492995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid, "store_id" uuid, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_roles" ("employees_id" uuid NOT NULL, "roles_id" uuid NOT NULL, CONSTRAINT "PK_2288499b8dcd79c02e6a3424039" PRIMARY KEY ("employees_id", "roles_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e85c212890401e99f3d733dbc7" ON "employee_roles" ("employees_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_36d8ba15b6b1393c921b384473" ON "employee_roles" ("roles_id") `);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_c7da9c52c80593b9b657051923a" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_roles" ADD CONSTRAINT "FK_e85c212890401e99f3d733dbc79" FOREIGN KEY ("employees_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_roles" ADD CONSTRAINT "FK_36d8ba15b6b1393c921b3844732" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_roles" DROP CONSTRAINT "FK_36d8ba15b6b1393c921b3844732"`);
        await queryRunner.query(`ALTER TABLE "employee_roles" DROP CONSTRAINT "FK_e85c212890401e99f3d733dbc79"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_c7da9c52c80593b9b657051923a"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36d8ba15b6b1393c921b384473"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e85c212890401e99f3d733dbc7"`);
        await queryRunner.query(`DROP TABLE "employee_roles"`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
