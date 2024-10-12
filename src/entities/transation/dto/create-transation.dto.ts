
import { IsNotEmpty} from 'class-validator';

export class CreateTransationDto {

    @IsNotEmpty()
    hiringId:string
    
    data_transacao:Date

    @IsNotEmpty()
    value:number
}
