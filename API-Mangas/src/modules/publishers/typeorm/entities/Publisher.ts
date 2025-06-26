import Manga from "@modules/mangas/typeorm/entities/Manga";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('publishers')
export default class Publisher{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @OneToMany(()=>Manga, manga=>manga.publisher)
    mangas: Manga[];

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