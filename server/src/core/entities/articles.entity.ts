// Vendors
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Articles {
    @PrimaryGeneratedColumn()
    idArticle: number;

    @Column('varchar', { length: 250 })
    file: string;

    @Column('varchar', { length: 250 })
    title: string;

    @Column('varchar', { length: 2500 })
    description: string;

    @Column('varchar', { length: 450 })
    query: string;
}