import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './entities/customer/customer.module';
import { HiringModule } from './entities/hiring/hiring.module';
import { ProviderModule } from './entities/provider/provider.module';
import { ServicetoproviderModule } from './entities/servicetoprovider/servicetoprovider.module';
import { TransationModule } from './entities/transation/transation.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guards';
import { RolesGuard } from './auth/roles.guards';
import { ConfigModule } from '@nestjs/config';
import { ormConfig } from './configdb/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(ormConfig),
    UserModule,
    CustomerModule,
    HiringModule,
    ProviderModule,
    ServicetoproviderModule,
    TransationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
