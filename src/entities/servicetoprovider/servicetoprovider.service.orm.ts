

import { Injectable } from '@nestjs/common';
import { ServiceToprovider } from 'src/domain/servicetoprovider/servicetoprovider';
import { Servicetoprovider as ServiceToproviderEntity } from 'src/entities/servicetoprovider/entities/servicetoprovider.entity'
import { ServiceToproviderGateway } from 'src/domain/servicetoprovider/servicetoprovider.gateway';
import { ServiceToProviderRepository } from './entities/repository/servicetoprovider.reporsitory';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceNotFoundException } from './exception/servicenotfound';


@Injectable()
export class ServicetoproviderServiceORM implements ServiceToproviderGateway {

    constructor(
        @InjectRepository(ServiceToproviderEntity)
        private readonly servicetoproviderRepository: ServiceToProviderRepository) { }


    async create(sv: ServiceToprovider): Promise<void> {

        const stv = await this.servicetoproviderRepository.create(
            {
                ...sv,
                provider: { id: sv.providerId }
            }
        );
        await this.servicetoproviderRepository.save(stv)
    }

    async findById(id: string): Promise<ServiceToprovider | null> {

        const sv = await this.servicetoproviderRepository.findOne({ where: { id }, relations: ['provider'] })
        if (!sv) throw new ServiceNotFoundException("Serviço Não encontrado")

        return new ServiceToprovider(
            {
                description: sv.description,
                price: sv.price,
                providerId: sv.provider.id,
                title: sv.title
            }
        )
    }
    async findAll(): Promise<ServiceToprovider[] | null> {

        const sv = await this.servicetoproviderRepository.find({ relations: ['provider'] });

        return sv.map((sv) => new ServiceToprovider(
            {
                description: sv.description,
                price: sv.price,
                providerId: sv.provider.id,
                title: sv.title
            }, sv.id
        ))
    }

    async delete(id: string): Promise<void> {
        const sv = await this.servicetoproviderRepository.findOne({ where: { id }, relations: ['provider'] })

        if (!sv) throw new ServiceNotFoundException("Serviço Não encontrado")
        await this.servicetoproviderRepository.delete({ id })
    }



}
