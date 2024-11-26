import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('increment')
    id:Number

    @Column()
    date: Date

    @Column()
    title: String

    @Column()
    place: String

    @Column({type: "float"})
    amount: Number

    @Column()
    expenses: String

    @Column()
    bank: String

    @Column()
    type: String
}
