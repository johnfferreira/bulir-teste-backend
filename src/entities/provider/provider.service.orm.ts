import { Injectable } from "@nestjs/common";
import { ProviderGateway } from "src/domain/provider/provider.gateway";
import { ProviderRepository } from "./entities/repository/provider.reporsitory";
import { Provider as ProviderEntity } from "./entities/provider.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserServiceORM } from "../user/user.service.orm";
import { Provider } from "src/domain/provider/provider";
import {User } from "src/domain/user/user";
import { UserNotFoundException } from "../user/exception/usernoutfoundexception";
import { Role } from "src/roleenum/role";

@Injectable()
export class ProviderServiceORM implements ProviderGateway {
    constructor(
        @InjectRepository(ProviderEntity)
        private readonly providerRepository: ProviderRepository,
        private readonly userServiceORM: UserServiceORM
    ) { }


    async findById(id: string): Promise<Provider | null> {
        const user = await this.userServiceORM.findById(id);

        if (!user) throw new UserNotFoundException("Usuario Nao encontrado")

        return new Provider(user, user.id);
    }

    async findAll(): Promise<Provider[] | null> {

        const providerEntity = await this.providerRepository
            .createQueryBuilder('provider')
            .leftJoinAndSelect('provider.user', 'user')
            .where('user.role = :role', { role: Role.PROVIDER })
            .getMany();

        const user = providerEntity.map((provider) => new User(provider.user, provider.id))
        return user.map((user) => new Provider(user, user.id))
    }

    async create(provider: Provider): Promise<void> {

        const providerEntity = await this.providerRepository.create({
            ...provider,
            id:provider.publicId
        })
        await this.providerRepository.save(providerEntity);
    }

    async delete(id: string): Promise<void> {

        const user = await this.userServiceORM.findById(id);

        if (!user) throw new UserNotFoundException("Usuario Nao encontrado")
        await this.userServiceORM.delete(id);
    }




}
