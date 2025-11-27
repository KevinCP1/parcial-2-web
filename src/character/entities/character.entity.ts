import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Location } from '../../location/entities/location.entity';

@Entity()
export class Character {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('int')
    salary: number;

    @Column('boolean')
    employee: boolean;

    // Ownership
    @OneToOne(() => Location, (location) => location.owner)
    @JoinColumn()
    ownership: Location;

    // Favorites
    @ManyToMany(() => Location, (location) => location.favCharacters)
    @JoinTable()
    favPlaces: Location[];

}
