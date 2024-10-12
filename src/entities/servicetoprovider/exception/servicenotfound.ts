

import { HttpStatus } from "@nestjs/common";
import { APPException } from "src/exception/exceptiom";


export class ServiceNotFoundException extends APPException
{
    constructor(message:string){
            
        super(
            {
                message,
                status: HttpStatus.NOT_FOUND,
            }
        )
    }
}