
import { IsNotEmpty} from 'class-validator';

export class CreateServicetoproviderDto {


    @IsNotEmpty()
    title: string;
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    providerId: string

}
