import { Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGateway } from 'src/domain/user/user.gateway';
import { User } from '../../domain/user/user';
import { ListUserDto } from './dto/list-customer.dto';
import { UserNotFoundException } from './exception/usernoutfoundexception';

@Injectable()
export class UserService {
  constructor(private readonly userGateway: UserGateway) { }

  async create({ name, email, password, role, balance }: CreateUserDto) {

    const user = new User({ name, email, password, role, balance });
    return await this.userGateway.create(user);
  }

  async findAll() {

    var user = await this.userGateway.findAll();

    return user.map((user) => new ListUserDto({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      balance: user.balance
    }))
  }

  async findByEmail(email: string) {
    return await this.userGateway.findByEmail(email);
  }

  async findOne(id: string) {
    const user = await this.userGateway.findById(id);

    if (!user) throw new UserNotFoundException("Usuario nao encontrado");
    return new ListUserDto({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      balance: user.balance
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userGateway.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.userGateway.delete(id);
  }
}
