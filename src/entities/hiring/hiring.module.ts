import { Module } from '@nestjs/common';
import { HiringService } from './hiring.service';
import { HiringController } from './hiring.controller';
import { Hiring } from './entities/hiring.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from '../customer/customer.module';
import { ServicetoproviderModule } from '../servicetoprovider/servicetoprovider.module';
import { ProviderModule } from '../provider/provider.module';
import { HiringGateway } from 'src/domain/hiring/hiring.gateway';
import { HiringServiceORM } from './hiring.service.orm';
import { UserModule } from '../user/user.module';
import { TransationModule } from '../transation/transation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hiring]),
    CustomerModule, ServicetoproviderModule, ProviderModule, UserModule, TransationModule],
  controllers: [HiringController],
  providers: [HiringService,
    {
      provide: HiringGateway,
      useClass:HiringServiceORM
    }
  ],
  exports:[HiringGateway]
})
export class HiringModule { }
