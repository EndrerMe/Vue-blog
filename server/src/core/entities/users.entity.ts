// Vendors
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    userName: string;

    @Column()
    userEmail: string;

    @Column()
    userPassword: string;

}
