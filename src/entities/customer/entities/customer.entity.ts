
import { Hiring } from "src/entities/hiring/entities/hiring.entity";
import {User } from "src/entities/user/entities/user.entity";
import { Entity,JoinColumn, OneToMany, OneToOne, Column, PrimaryColumn } from "typeorm";



@Entity()
export class Customer {

    @PrimaryColumn()
    id: string;
    
    @OneToMany(() => Hiring, (hr) => hr.customer)
    hiring: Hiring[];

    @OneToOne(() => User, user => user.customer, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    constructor(user:User, id?: string) {

        this.user = user;
        this.id = id ? id : crypto.randomUUID().toString();

    }





}
