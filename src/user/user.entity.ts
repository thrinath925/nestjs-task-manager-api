import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class user{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    password: string
}


