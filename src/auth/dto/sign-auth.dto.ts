

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignAuthDto {

    @IsEmail()
    @IsNotEmpty({message:'O email nao pode ser vazio'})
    email:string;

    @IsNotEmpty({message:'A password nao pode ser vazio'})
    @IsString()
    password:string;

    constructor(email:string,password:string){

        this.email = email,
        this.password = password

    }
}
