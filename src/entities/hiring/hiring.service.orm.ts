import { Injectable } from '@nestjs/common';
import { Hiring } from 'src/domain/hiring/hiring';
import { Hiring as HiringEntity } from 'src/entities/hiring/entities/hiring.entity';
import { HiringGateway } from 'src/domain/hiring/hiring.gateway';
import { HiringRepository } from './entities/repository/hiring.reporsitory';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServiceORM } from '../user/user.service.orm';
import { ServicetoproviderServiceORM } from '../servicetoprovider/servicetoprovider.service.orm';
import { ProviderServiceORM } from '../provider/provider.service.orm';
import { TransationServiceORM } from '../transation/transation.service.orm';
import { Transactional, runOnTransactionCommit } from 'typeorm-transactional';

@Injectable()
export class HiringServiceORM implements HiringGateway {

    constructor(
        @InjectRepository(HiringEntity)
        private readonly hiringRepository: HiringRepository,
        private readonly userService: UserServiceORM,
        private readonly serviceToProviderService: ServicetoproviderServiceORM,
        private readonly providerService: ProviderServiceORM,
        private readonly transationService: TransationServiceORM,
    ) { }


    @Transactional()
    async create(hiring: Hiring): Promise<void> {

        const customer = await this.userService.findById(hiring.customerId)
        const servicetoprovider = await this.serviceToProviderService.findById(hiring.serviceTopProviderId)
        const provider = await this.providerService.findById(servicetoprovider.providerId);
        const hirings = await this.hiringRepository.create({

            id: hiring.id,
            customer: { id: hiring.customerId },
            data_contratacao: hiring.data_contratacao,
            serviceTopProvider: { id: hiring.serviceTopProviderId },
            status: hiring.status

        });

      const saveHiring =  await this.hiringRepository.save(hirings)

        await this.userService.update(customer.id, {
            name: customer.name,
            email: customer.email,
            balance: (customer.balance - servicetoprovider.price)
        })

        await this.userService.update(provider.publicId, {
            name: provider.user.name,
            email: provider.user.email,
            balance: (provider.user.balance + servicetoprovider.price)
        })

      await  this.transationService.create({
            value: servicetoprovider.price,
            data_transacao: saveHiring.data_contratacao,
            hiringId:saveHiring.id
          })
          
          runOnTransactionCommit(() => console.log('created'));
    }

    async findById(id: string): Promise<Hiring | null> {

        const hiring = await this.hiringRepository.findOne({
            where: { id },
            relations: ['customer', 'serviceTopProvider']
        });

        return new Hiring({
            customerId: hiring.customer.id,
            data_contratacao: hiring.data_contratacao,
            serviceTopProviderId: hiring.serviceTopProvider.id,
            status: hiring.status,
        }, hiring.id)
    }


    async findAll(): Promise<Hiring[] | null> {

        const hiring = await this.hiringRepository.find({ relations: ['customer', 'serviceTopProvider'] });

        return hiring.map((hiring) => new Hiring({
            customerId: hiring.customer.id,
            data_contratacao: hiring.data_contratacao,
            serviceTopProviderId: hiring.serviceTopProvider.id,
            status: hiring.status,
        }, hiring.id))
    }

    async delete(id: string): Promise<void> {

        await this.hiringRepository.delete(id);
    }

}
