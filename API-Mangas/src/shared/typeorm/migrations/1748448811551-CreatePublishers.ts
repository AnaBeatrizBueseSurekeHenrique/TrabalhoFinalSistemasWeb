import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePublishers1748448811551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'publishers',
                columns: [
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: 'name', type: 'varchar'},
                    {name: 'description', type: 'varchar', isNullable: true},
                    {name: 'country_of_origin', type: 'varchar'},
                    {name: 'headquarters', type: 'varchar'},
                    {name: 'foundation_date', type: 'timestamp'},
                    {name: 'created_at', type: 'timestamp', default:'now()'},
                    {name: 'updated_at', type: 'timestamp', default:'now()'}
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('publishers');
    }

}
