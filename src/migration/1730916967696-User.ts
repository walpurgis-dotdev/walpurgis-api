import { MigrationInterface, QueryRunner } from "typeorm";

export class User1730916967696 implements MigrationInterface {
    name = 'User1730916967696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying(36) NOT NULL, "name" text, "email" text, "image" text, "cover" text, "company" text, "title" text, "reputation" integer NOT NULL DEFAULT '10', "username" character varying(39), "bio" text, "github" character varying(39), "threads" character varying(39), "youtube" character varying(39), "timezone" text DEFAULT 'Etc/UTC', "weekStart" integer DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "experienceLevel" text, "language" text, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_user_email" ON "user" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_username_unique" ON "user" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_github_unique" ON "user" ("github") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_threads_unique" ON "user" ("threads") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_youtube_unique" ON "user" ("youtube") `);
        await queryRunner.query(`CREATE INDEX "IDX_user_createdAt" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE MATERIALIZED VIEW "user_stats" AS SELECT u."id", u."reputation" AS "reputation" FROM "public"."user" "u"`);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","MATERIALIZED_VIEW","user_stats","SELECT u.\"id\", u.\"reputation\" AS \"reputation\" FROM \"public\".\"user\" \"u\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["MATERIALIZED_VIEW","user_stats","public"]);
        await queryRunner.query(`DROP MATERIALIZED VIEW "user_stats"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_createdAt"`);
        await queryRunner.query(`DROP INDEX "public"."users_youtube_unique"`);
        await queryRunner.query(`DROP INDEX "public"."users_threads_unique"`);
        await queryRunner.query(`DROP INDEX "public"."users_github_unique"`);
        await queryRunner.query(`DROP INDEX "public"."users_username_unique"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_email"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
