import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserServiceORM } from './user.service.orm';
import { UserGateway } from 'src/domain/user/user.gateway';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/repository/user.reporsitory';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,UserServiceORM,
   {
    provide:UserGateway, 
    useClass:UserServiceORM
   }
  ],
  exports:[UserGateway, UserService, UserServiceORM]
}) 
export class UserModule {}
