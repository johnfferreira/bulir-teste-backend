import { Provider } from "../provider/provider";

interface Iprop {
    title: string,
    description: string,
    price: number,
    providerId: string;
}

export  class ServiceToprovider
{
    publicId:string;
    title: string;
    description: string;
    price: number;
    providerId: string;

     constructor(prop:Iprop, id?:string){
        
        Object.assign(this,prop);
        this.publicId = id?id:crypto.randomUUID().toString()

    }

}
