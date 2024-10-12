import { Role } from "src/roleenum/role";


interface Iprop{

    id:string
    name:string;
    email:string;
    role:Role[];
    balance:number
}

export class ListUserDto {
    
    id:string
    name:string;
    email:string;
    role:Role[];
    balance:number

    constructor(prop:Iprop){
        Object.assign(this,prop)

    }


}