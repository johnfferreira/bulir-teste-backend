import { Injectable } from "@nestjs/common";
import { CustomerGateway } from "src/domain/customer/customer.gateway";
import { CustomerRepository } from "./entities/repository/customer.reporsitory";
import { Customer as CustomerEntity } from "./entities/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/domain/customer/customer";
import { UserServiceORM } from "../user/user.service.orm";
import {User } from "src/domain/user/user";
import { UserNotFoundException } from "../user/exception/usernoutfoundexception";
import { Role } from "src/roleenum/role";

@Injectable()
export class CustomerServiceORM implements CustomerGateway {

    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: CustomerRepository,
        private readonly userServiceORM: UserServiceORM
    ) { }

    async findById(id: string): Promise<Customer | null> {

        const user = await this.userServiceORM.findById(id);

        if (!user) throw new UserNotFoundException("Usuario Nao encontrado")
        return new Customer(user, user.id);
    }

    async findAll(): Promise<Customer[] | null> {

        const customerEntity = await this.customerRepository
            .createQueryBuilder('customer')
            .leftJoinAndSelect('customer.user', 'user')
            .where('user.role = :role', { role: Role.CUSTOMER })
            .getMany();

        const user = customerEntity.map((customer) => new User(customer.user, customer.id))
        return user.map((user) => new Customer(user, user.id))
    }

    async create(customer: Customer): Promise<void> {

        const costumer = await this.customerRepository.create({
            ...customer,
            id: customer.id
        });
        await this.customerRepository.save(costumer);
    }

    async delete(id: string): Promise<void> {
        const user = await this.userServiceORM.findById(id);

        if (!user) throw new UserNotFoundException("Usuario Nao encontrado")
        await this.customerRepository.delete(id);
    }


}
