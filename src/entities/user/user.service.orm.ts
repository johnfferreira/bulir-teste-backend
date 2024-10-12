import {Injectable} from '@nestjs/common';
import { UserGateway } from 'src/domain/user/user.gateway';
import { User } from '../../domain/user/user';
import { User as UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './entities/repository/user.reporsitory';

@Injectable()
export class UserServiceORM implements UserGateway {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository) { }

  async findByEmail(email: string): Promise<User | null> {

    const user = await this.userRepository.findOneBy({ email })
    if (!user) return null;

    return new User({
      name: user.name,
      password: user.password,
      email: user.email,
      role: user.role,
      balance: user.balance
    }, user.id);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) return null;
    return new User({
      name: user.name,
      password: user.password,
      email: user.email,
      role: user.role,
      balance: user.balance
    }, user.id);
  }

  async findAll(): Promise<User[] | null> {
    var user = await this.userRepository.find();

    return user.map((user) => new User({
      name: user.name,
      password: user.password,
      email: user.email,
      role: user.role,
      balance: user.balance
    }, user.id,))
  }

  async create(user: User): Promise<User> {

    const auser = new UserEntity({
      name: user.name,
      email: user.email,
      password: user.password,
      balance: user.balance,
      role: user.role
    });
    let userOut = await this.userRepository.save(auser);
    return new User({
      name: userOut.name,
      password: userOut.password,
      email: userOut.email,
      role: userOut.role,
      balance: userOut.balance
    }, userOut.id);
  }

 async  update(id: string, {balance, email, name}: Partial<User>): Promise<void> {
   
   await this.userRepository
    .createQueryBuilder()
    .update(UserEntity)
    .set({balance, email, name })
    .where("id = :id", { id })
    .execute();
  }

  async delete(id: string): Promise<void> {

    await this.userRepository.delete(id);
  }

}
