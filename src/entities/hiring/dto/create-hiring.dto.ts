import { Status } from "../entities/hiring.entity";
import { IsNotEmpty} from 'class-validator';

export class CreateHiringDto
{

    @IsNotEmpty()
    customerId:string;

    @IsNotEmpty()
    serviceTopProviderId:string;

    data_contratacao:Date;
    status:Status;
}
