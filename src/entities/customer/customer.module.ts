import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerGateway } from 'src/domain/customer/customer.gateway';
import { CustomerServiceORM } from './customer.service.orm';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Customer]),UserModule],
  controllers: [CustomerController],
  providers: [CustomerService,

      {
        provide:CustomerGateway, 
        useClass:CustomerServiceORM
       }
  ],
  exports:[CustomerGateway, CustomerService]
})
export class CustomerModule {}
