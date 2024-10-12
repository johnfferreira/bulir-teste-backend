import { Provider } from "src/entities/provider/entities/provider.entity";

interface Iprop{

    id:string;
    title: string;
    description: string;
    price: number;
    providerId: string
}

export class ListServicetoproviderDto{
    id:string;
    title: string;
    description: string;
    price: number;
    providerId: string


    constructor(prop:Iprop){

        Object.assign(this,prop);
    }

    
}