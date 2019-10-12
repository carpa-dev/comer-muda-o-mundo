import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInitiative1570916082502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "initiatives_v2" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "latitude" character varying(100) NOT NULL, "longitude" character varying(100) NOT NULL, "post" text NOT NULL, "isPublished" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_25badbb283bfcd476b93e11dc88" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "initiatives_v2"`, undefined);
    }

}
