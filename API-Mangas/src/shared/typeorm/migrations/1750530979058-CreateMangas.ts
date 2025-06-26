import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMangas1749151786846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'mangas',
                columns:[
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: "title",type:"varchar", isUnique:true},
                    {name: "author_name", type: "varchar"},
                    {name: "target_demographic", type: "varchar"},
                    {name: "quantity_volumes", type:"int"},
                    {name: "cover", type:"varchar", isNullable: true},
                    {name: "publisher_id",type: 'uuid'},
                    {name: 'created_at', type: 'timestamp', default: 'now()' },
                    {name: 'updated_at', type: 'timestamp', default: 'now()' }
                ],
                foreignKeys:[{
                    name: 'MangaPublisher',
                    referencedTableName : 'publishers',
                    referencedColumnNames: ['id'],
                    columnNames: ['publisher_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
              ]
            })
        )
    }    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('mangas');
    }
}
