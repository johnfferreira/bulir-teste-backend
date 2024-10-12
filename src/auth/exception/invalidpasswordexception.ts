import { HttpStatus } from "@nestjs/common";
import { APPException } from "src/exception/exceptiom";


export class InvalidPasswordException extends APPException
{
    constructor(message:string){
            
        super(
            {
                message,
                status: HttpStatus.UNAUTHORIZED,
            }
        )
    }
}