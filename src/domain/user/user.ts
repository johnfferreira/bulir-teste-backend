import { Role } from "src/roleenum/role";


 interface Iprop{

    name:string,
    email:string,
    password:string,
    role:Role[],
    balance:number,
}

export  class User
{
    id:string;
    name:string;
    email:string;
    password:string;
    role:Role[];
    balance:number;

    constructor(prop:Iprop, id?:string){

        Object.assign(this,prop),
        this.id = id? id: crypto.randomUUID().toString()
    }
}
