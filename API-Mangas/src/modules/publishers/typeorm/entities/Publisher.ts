import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('publishers')
export default class Publisher{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    country_of_origin: string;
    @Column()
    headquarters: string;
    @Column()
    foundation_date: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}