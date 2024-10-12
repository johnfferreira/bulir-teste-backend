
interface Iprop {

    hiringId: string,
    data_transacao: Date,
    value: number
}

export  class Transation
{
    id?:string;
    hiringId: string;
    data_transacao: Date;
    value: number;

     constructor(prop:Iprop, id?:string)
     {
        Object.assign(this,prop);
        this.id = id?id:crypto.randomUUID().toString()
     }

}
