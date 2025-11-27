import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany } from 'typeorm';
import { Character } from '../../character/entities/character.entity';

@Entity()
export class Location {

        @PrimaryGeneratedColumn()
        id: number;

        @Column('text')
        name: string;

        @Column('text')
        type: string;

        @Column('int')
        cost: number;

        // Ownership
        @OneToOne(() => Character, (character) => character.ownership)
        owner?: Character | null;

        // Favorites 
        @ManyToMany(() => Character, (character) => character.favPlaces)
        favCharacters: Character[];

}
