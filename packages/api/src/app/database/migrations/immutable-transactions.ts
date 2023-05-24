import { MigrationInterface, QueryRunner } from 'typeorm';

export class immutableTransactions implements MigrationInterface {
  name = 'immutableTransactions9676945458749';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE or REPLACE FUNCTION stop_processing() RETURNS TRIGGER LANGUAGE plpgsql AS $$
        BEGIN
            RETURN null;
        END $$;`
    );
    await queryRunner.query(
      `CREATE or REPLACE TRIGGER updating BEFORE UPDATE or DELETE on transactions FOR EACH ROW EXECUTE PROCEDURE stop_processing();`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS "stop_processing" CASCADE`
    );
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS updating on transactions CASCADE`
    );
  }
}
