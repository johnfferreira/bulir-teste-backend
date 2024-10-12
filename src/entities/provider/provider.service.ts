import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ListProviderDto } from './dto/list-provider.dto';
import { User } from 'src/domain/user/user';
import { ProviderGateway } from 'src/domain/provider/provider.gateway';
import { Provider } from 'src/domain/provider/provider';
import { UserService } from '../user/user.service';
import { EmailAlreadExistedException } from './exception/emailalreadexistexception';
import { Role } from 'src/roleenum/role';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProviderService {
  constructor(
    private readonly providerGateway: ProviderGateway,
    private readonly userService: UserService
  ) { }

  async create({ name, email, password, balance}: CreateProviderDto) {

    const auser = await this.userService.findByEmail(email);
    if (auser)
        throw new EmailAlreadExistedException("Email ja cadastrado")

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const user = new User({ name, email, password:hash, balance, role: [Role.PROVIDER] })
    const provider = new Provider(user, user.id);
    await this.providerGateway.create(provider);
  }

  async findAll() {

    let auser = await this.providerGateway.findAll();

    return auser.map((user) => new ListProviderDto({
      id: user.publicId,
      name: user.user.name,
      email: user.user.email,
      role: user.user.role,
      balance: user.user.balance
    }))
  }


  async findOne(id: string) {
    const user = await this.providerGateway.findById(id);

    return new ListProviderDto({
      id: user.publicId,
      name: user.user.name,
      email: user.user.email,
      role: user.user.role,
      balance: user.user.balance
    })
  }

  async findOneProvider(id: string) {
    return await this.providerGateway.findById(id);
  }

  remove(id: string) {
    return this.providerGateway.delete(id);
  }
}
