import { Injectable } from "@nestjs/common";
import { TransationRepository } from "./entities/repository/transation.reporsitory";
import { TransationGateway } from "src/domain/transation/transation.gateway";
import { Transation } from "src/domain/transation/transation";
import { Transation as TransationEntity  } from "src/entities/transation/entities/transation.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class TransationServiceORM implements TransationGateway {

  constructor(
    @InjectRepository(TransationEntity)
    private readonly transationRepository: TransationRepository){}

   async findAll(): Promise<Transation[] | null> {
        
        const transation = await this.transationRepository.find({relations: ['hiring']});
        

        return transation.map((tr) => new Transation({
            
            hiringId:tr.hiring.id,
            data_transacao: tr.data_transacao,
            value:tr.value
        }, tr.id))
    }

    async create({data_transacao, hiringId, value}: Transation): Promise<void> {
       
        const transations = await this.transationRepository.create({
            data_transacao,
            hiring:{ id:hiringId },
            value
        })

        await this.transationRepository.save(transations);
    }

 
  
}
