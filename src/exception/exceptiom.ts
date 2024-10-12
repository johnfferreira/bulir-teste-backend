import { HttpException, HttpStatus } from "@nestjs/common";


 interface Iprop{
    message: string,
   error?: string,
   status: HttpStatus,
   field?:{
    [key: string]:string
   }
 }
export class APPException extends HttpException
{
    constructor({message, status, field}:Iprop)
    {
        super(
            {
                message,
                field,
            },
            status
        )
    }
}