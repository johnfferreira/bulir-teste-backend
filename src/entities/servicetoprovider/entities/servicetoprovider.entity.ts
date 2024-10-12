import { Hiring } from "src/entities/hiring/entities/hiring.entity";
import { Provider } from "src/entities/provider/entities/provider.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


interface Iprop {
    title: string,
    description: string,
    price: number,
    provider: Provider
}

@Entity()
export class Servicetoprovider {


    @PrimaryColumn()
    id?: string;

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    price: number;

    @ManyToOne(() => Provider, (p) => p.services, {onDelete: 'CASCADE'})
    provider: Provider;

    @OneToMany(() => Hiring, (hr) => hr.customer)
    hiring: Hiring[];

     constructor(prop: Iprop, id?: string) {
        Object.assign(this, prop),
            this.id = id ? id : crypto.randomUUID().toString();

    }
}
