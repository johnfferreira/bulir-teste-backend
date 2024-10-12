import { Hiring } from "src/entities/hiring/entities/hiring.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

interface Iprop {

    hiring: Hiring,
    data_transacao: Date,
    value: number
}

@Entity()
export class Transation {


    @PrimaryColumn()
    id: string

    @Column()
    data_transacao: Date

    @Column()
    value: number

    @ManyToOne(() => Hiring, (hr) => hr.transation, {onDelete: 'CASCADE' })
    hiring: Hiring

    private constructor(prop: Iprop, id?: string) {
        Object.assign(this, prop),
            this.id = id ? id : crypto.randomUUID().toString();
    }

    public static create(
        hiring: Hiring,
        data_transacao: Date,
        value: number) {

        return new Transation({
            hiring,
            data_transacao,
            value,
        },
        )
    }
}
