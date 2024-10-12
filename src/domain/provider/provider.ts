
import { User } from "../user/user";


export  class Provider
{
    publicId:string;
    user: User;

    constructor(userId: User, id?: string)
    {
        this.user = userId;
        this.publicId = id ? id : crypto.randomUUID().toString();
    }

}
