import { Module } from '@nestjs/common';
import { ServicetoproviderService } from './servicetoprovider.service';
import { ServicetoproviderController } from './servicetoprovider.controller';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Servicetoprovider } from './entities/servicetoprovider.entity';
import { ProviderModule } from '../provider/provider.module';
import { ServiceToproviderGateway } from 'src/domain/servicetoprovider/servicetoprovider.gateway';
import { ServicetoproviderServiceORM } from './servicetoprovider.service.orm';

@Module({
  imports:[TypeOrmModule.forFeature([Servicetoprovider]),ProviderModule],
  controllers: [ServicetoproviderController],
  providers: [ServicetoproviderService,ServicetoproviderServiceORM,

      {
        provide:ServiceToproviderGateway, 
        useClass:ServicetoproviderServiceORM
       }
  ],
  exports:[ServiceToproviderGateway, ServicetoproviderService, ServicetoproviderServiceORM]
})
export class ServicetoproviderModule {}
