import Publisher from "@modules/publishers/typeorm/entities/Publisher";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('mangas')
export default class Manga{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    title: string;
    @Column()
    author_name: string;
    @Column()
    target_demographic: string;
    @Column('int')
    quantity_volumes: number;
    
    @ManyToOne(()=> Publisher, publisher => publisher.mangas)
    @JoinColumn({name: "publisher_id"})
    publisher: Publisher;
     
    @Column()
    cover: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}