import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    token: string;

    @Column('bool', {
        default: true
    })
    active: boolean;

     @Column('number', {
        default: 10
    })
    reqLeft: number;
}
