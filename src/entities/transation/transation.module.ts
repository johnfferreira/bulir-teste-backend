import { Module } from '@nestjs/common';
import { TransationService } from './transation.service';
import { TransationController } from './transation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transation } from './entities/transation.entity';
import { TransationGateway } from 'src/domain/transation/transation.gateway';
import { TransationServiceORM } from './transation.service.orm';

@Module({

  imports:[TypeOrmModule.forFeature([Transation])],
  controllers: [TransationController],
  providers: [TransationService,TransationServiceORM,

    {
      provide: TransationGateway,
      useClass:TransationServiceORM
    }
  ],

  exports:[TransationGateway,TransationServiceORM ]
})
export class TransationModule {}
