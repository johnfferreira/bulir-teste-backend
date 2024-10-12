import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerGateway } from 'src/domain/customer/customer.gateway';
import { Customer } from 'src/domain/customer/customer';
import { ListUserCustomerDto } from './dto/list-customer.dto';
import { User } from 'src/domain/user/user';
import { UserService } from '../user/user.service';
import { EmailAlreadExistedException } from '../provider/exception/emailalreadexistexception';
import { Role } from 'src/roleenum/role';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerGateway: CustomerGateway,
    
    private readonly userService: UserService
  ) { }

  async create({ name, email, password, balance}: CreateCustomerDto) {

    const auser = await this.userService.findByEmail(email);
    if (auser)
        throw new EmailAlreadExistedException("Email ja cadastrado");

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const user = new User({ name, email, password:hash, balance, role: [Role.CUSTOMER] })
    const customer = new Customer(user, user.id);
    await this.customerGateway.create(customer);
  }

  async findAll() {

    var auser = await this.customerGateway.findAll();

    return auser.map((user) => new ListUserCustomerDto({
      id: user.id,
      name: user.user.name,
      email: user.user.email,
      role: user.user.role,
      balance: user.user.balance
    }))
  }

  async findOne(id: string) {
    const user = await this.customerGateway.findById(id);

    return new ListUserCustomerDto({
      id: user.id,
      name: user.user.name,
      email: user.user.email,
      role: user.user.role,
      balance: user.user.balance
    })
  }

  async findOneCustomer(id: string) {
    return await this.customerGateway.findById(id);
  }

  remove(id: string) {
    return this.customerGateway.delete(id);
  }
}
