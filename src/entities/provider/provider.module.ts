import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { UserModule } from '../user/user.module';
import { ProviderGateway } from 'src/domain/provider/provider.gateway';
import { ProviderServiceORM } from './provider.service.orm';

@Module({
  imports:[TypeOrmModule.forFeature([Provider]),UserModule],
  controllers: [ProviderController],
  providers: [ProviderService,ProviderServiceORM,

      {
        provide:ProviderGateway, 
        useClass:ProviderServiceORM
       }
  ],
  exports:[ProviderGateway, ProviderService, ProviderServiceORM]
})
export class ProviderModule {}
