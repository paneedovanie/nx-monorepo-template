import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1679796044853 implements MigrationInterface {
    name = 'initial1679796044853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying(60) NOT NULL, "verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "UQ_c286aa8e09ecff5cc756ee83214" UNIQUE ("email"), CONSTRAINT "REL_c68a6c53e95a7dc357f4ebce8f" UNIQUE ("user_id"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "parent_id" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" uuid, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "sender" uuid, "receiver" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permissions" ("roles_id" uuid NOT NULL, "permissions_id" uuid NOT NULL, CONSTRAINT "PK_3a2404462ad8373a26704fb1f1c" PRIMARY KEY ("roles_id", "permissions_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ad074b0f95ff0488162868be2c" ON "role_permissions" ("roles_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bae04782e4d2b4d4c978528970" ON "role_permissions" ("permissions_id") `);
        await queryRunner.query(`CREATE TABLE "user_roles" ("users_id" uuid NOT NULL, "roles_id" uuid NOT NULL, CONSTRAINT "PK_65ec3daed53f391c53df7e2e8fb" PRIMARY KEY ("users_id", "roles_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e1215206acb19f1c38dbda909" ON "user_roles" ("users_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a08d003e00caf075a4a212d23" ON "user_roles" ("roles_id") `);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_e4bd61cc68f39f6d12f38fd9564" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_7e1a585f3cdf1f5697d57579719" FOREIGN KEY ("sender") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_07b7a48cc077392d7e524798f84" FOREIGN KEY ("receiver") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_ad074b0f95ff0488162868be2c7" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_bae04782e4d2b4d4c978528970c" FOREIGN KEY ("permissions_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_8e1215206acb19f1c38dbda9091" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_4a08d003e00caf075a4a212d23d" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_4a08d003e00caf075a4a212d23d"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_8e1215206acb19f1c38dbda9091"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_bae04782e4d2b4d4c978528970c"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_ad074b0f95ff0488162868be2c7"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_07b7a48cc077392d7e524798f84"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_7e1a585f3cdf1f5697d57579719"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_e4bd61cc68f39f6d12f38fd9564"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a08d003e00caf075a4a212d23"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e1215206acb19f1c38dbda909"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bae04782e4d2b4d4c978528970"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ad074b0f95ff0488162868be2c"`);
        await queryRunner.query(`DROP TABLE "role_permissions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "credentials"`);
    }

}
