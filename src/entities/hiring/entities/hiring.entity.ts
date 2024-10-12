
import { Customer } from "src/entities/customer/entities/customer.entity";
import { Servicetoprovider } from "src/entities/servicetoprovider/entities/servicetoprovider.entity";
import { Transation } from "src/entities/transation/entities/transation.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

export enum Status{

    ACTIVE = "active",
    INACTIVE = "inactive"
}

interface IProp{

    customer:Customer,
    serviceTopProvider:Servicetoprovider,
    data_contratacao:Date,
    status:Status
}

@Entity()
export class Hiring {

    @PrimaryColumn()
    id:string

    @ManyToOne(() => Customer, (ct) => ct.hiring,{cascade:true,onDelete:'CASCADE'})                                    
    customer:Customer

    @ManyToOne(() => Servicetoprovider, (sv) => sv.hiring,{cascade:true,onDelete:'CASCADE'})
    serviceTopProvider:Servicetoprovider

    @Column()
    data_contratacao:Date

    @Column({type:'enum',enum:Status,default:Status.ACTIVE})
    status:Status

    @OneToMany(() =>Transation , (tv) => tv.hiring)
    transation:Transation[];

    private constructor(prop:IProp, id?:string){
        
        Object.assign(this,prop);
        this.id = id?id:crypto.randomUUID().toString()

    }

    public static create(customer:Customer,serviceTopProvider:Servicetoprovider,data_contratacao:Date,status:Status){

        return new Hiring({
            customer,
            serviceTopProvider,
            data_contratacao,
            status
        });


    }

}
