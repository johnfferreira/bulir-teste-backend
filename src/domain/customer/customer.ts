import { User } from "../user/user";

export  class Customer
{
    
    id:string;
    user: User;

    constructor(userId: User, id?: string)
    {
        this.user = userId;
        this.id = id ? id : crypto.randomUUID().toString();
    }

    
}
