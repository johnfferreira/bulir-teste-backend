
export enum Status{

    ACTIVE = "active",
    INACTIVE = "inactive"
}

interface IProp{

    customerId:string,
    serviceTopProviderId:string,
    data_contratacao:Date,
    status:Status
}

export  class Hiring
{
    id:string;
    customerId:string;
    serviceTopProviderId:string;
    data_contratacao:Date;
    status:Status;

     constructor(prop:IProp, id?:string){
        
        Object.assign(this,prop);
        this.id = id?id:crypto.randomUUID().toString()

    }

}
