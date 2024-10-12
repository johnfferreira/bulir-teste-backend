
import { Customer } from "src/entities/customer/entities/customer.entity";
import { Provider } from "src/entities/provider/entities/provider.entity";
import { Role } from "src/roleenum/role";
import { Column,OneToOne, Entity, PrimaryColumn} from "typeorm";

 interface Iprop{

    name:string,
    email:string,
    password:string,
    role:Role[],
    balance:number
}

@Entity()
export  class User {

    @PrimaryColumn()
    id: string;

    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({type:'enum',enum:Role})
    role:Role[];

    @Column()
    balance:number;

    @OneToOne(()=>Customer, ct=>ct.user)
    customer?:Customer;

    @OneToOne(()=>Provider, pv=>pv.user)
    provider?:Provider;
   
  constructor(prop:Iprop, id?:string){

        Object.assign(this,prop),
        this.id = id? id: crypto.randomUUID().toString()
    }


    

   

    


}
