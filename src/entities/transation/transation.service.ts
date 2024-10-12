import { Injectable } from '@nestjs/common';
import { CreateTransationDto } from './dto/create-transation.dto';
import { TransationGateway } from 'src/domain/transation/transation.gateway';
import { Transation } from 'src/domain/transation/transation';

@Injectable()
export class TransationService {

  constructor(private readonly transationGateway: TransationGateway){}
 async create({data_transacao, hiringId, value}: CreateTransationDto) {

   const transation = new Transation({data_transacao, hiringId, value})
   await this.transationGateway.create(transation);
  }

  findAll() {

    return this.transationGateway.findAll();
  }

  
}
