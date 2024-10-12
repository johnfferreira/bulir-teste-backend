import { Servicetoprovider } from "src/entities/servicetoprovider/entities/servicetoprovider.entity";
import { User } from "src/entities/user/entities/user.entity";
import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn} from "typeorm";



@Entity()
export class Provider {

    @PrimaryColumn()
    id?: string;
    
    @OneToMany(() => Servicetoprovider, (s) => s.provider)
    services?: Servicetoprovider[];

    @OneToOne(() => User, user => user.provider,{cascade:true,onDelete:'CASCADE'})
    @JoinColumn({ name: 'userId' })
    user: User ;

    constructor(userId: User, id?: string) {

        this.user = userId;
        this.id = id ? id : crypto.randomUUID().toString();

    }



}
