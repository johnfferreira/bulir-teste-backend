
import { IsEmail, IsNotEmpty, IsNumber} from 'class-validator';
import { Role } from 'src/roleenum/role';
export class CreateUserDto 
{

    @IsNotEmpty()
    name:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;
    
    role:Role[];

    @IsNumber()
    balance:number;
}
